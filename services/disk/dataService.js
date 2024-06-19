import * as FileSystem from "expo-file-system";
import { getJson, setJson } from "../../utils/utils";
import { CLOUD } from "../cloud/dataService";
import { shareAsync } from "expo-sharing";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

// Constant defining the filename for user data storage.
const dataJSON = "userData.json";
const localDataDir = `${FileSystem.documentDirectory}localData/`
const userFolder = (token) => { return "user_"+token; }

// Function to check if a directory exists at the given URI asynchronously.
const directoryExists = async (directoryUri) => {
  try {
    const { exists } = await FileSystem.getInfoAsync(directoryUri);
    return exists;
  } catch (error) {
    console.error("Error checking directory existence:", error);
    return false;
  }
};

const getUserTokenFromFolderName = (folderName) => {
  return folderName.substring(5);
};

const getAllUsers = async () => {
  try {
    const localDataInfo = await FileSystem.getInfoAsync(localDataDir);
    if (localDataInfo.exists) {
      const files = await FileSystem.readDirectoryAsync(localDataDir);
      // Filter out folders that start with "user_" and extract tokens
      const tokens = await Promise.all(files
        .filter(file => file.startsWith('user_'))
        .map(async folder => {
          const token = getUserTokenFromFolderName(folder);
          const userDataPath = getUserData(token);
          const userDataExists = await existLocalFile(token);
          if (userDataExists) {
            const userDataContents = await FileSystem.readAsStringAsync(userDataPath);
            const userData = getJson(userDataContents);
            return { token, name: userData.name, surname: userData.surname };
          } else {
            // If user data doesn't exist, return null
            return null;
          }
        }));
      
      // Filter out null values (folders with no user data)
      return tokens.filter(token => token !== null);
    } else {
      // Local data directory doesn't exist
      return [];
    }
  } catch (error) {
    console.error("Error getting tokens from local data directory:", error);
    return [];
  }
};


// Function to check if the user data file exists locally.
const existLocalFile = async (token) => {
  const fileInfo = await FileSystem.getInfoAsync(getUserData(token));
  return fileInfo.exists;
};

const checkUserFoldersExist = async () => {
  try {
    const localDataInfo = await FileSystem.getInfoAsync(localDataDir);
    if (localDataInfo.exists) {
      const files = await FileSystem.readDirectoryAsync(localDataDir);
      // Check if any user folder starts with "user_"
      const userFoldersExist = files.some(file => file.startsWith('user_'));
      if(userFoldersExist) {
        return true;
      }else{
        return false
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user folders existence:", error);
    return false;
  }
};

// Function to create a directory for the logged-in user based on their email.
const createDirectory = async (token) => {
  try {
    await FileSystem.makeDirectoryAsync(`${localDataDir}${userFolder(token)}/`, { intermediates: true });
  } catch (error) {
    return false;
  }
};

// Function to get the full path of the user data file based on the user's email.
const getUserData = (token) => directoryExists(`${localDataDir}${userFolder(token)}/${dataJSON}`) ? `${localDataDir}${userFolder(token)}/${dataJSON}` : null;

// Function to get the full path of the user directory based on the user's email.
const getUserDirectory = (token) => directoryExists(`${localDataDir}${userFolder(token)}`) ? `${localDataDir}${userFolder(token)}` : null;

// Function to write user data to the local file system after creating the necessary directory.
const writeLocalData = async (token, data) => {
  data.localDataSave = "WithMe-Data";

  if (getUserDirectory()) {
      await createDirectory(token);
  }
  await FileSystem.writeAsStringAsync(getUserData(token), setJson(data));
};

// Function to read user data from the local file system if the file exists.
const readLocalData = async (token) => {
    const dataContents = await FileSystem.readAsStringAsync(getUserData(token));
    return (await existLocalFile(token)) ? getJson(dataContents) : null;
};

// Function to delete the directory for the logged-in user based on their email.
const deleteLocalData = async (token) => {
  try {
    const exists = await directoryExists(`${localDataDir}${userFolder(token)}`);
    if (exists) {
      await FileSystem.deleteAsync(`${localDataDir}${userFolder(token)}`, { idempotent: true });
    }
  } catch (error) {
    console.error("Error deleting directory:", error);
    return false;
  }
};

const deleteAllLocalData = async () => {
  try {
    const exists = await directoryExists(localDataDir);
    if (exists) {
      await FileSystem.deleteAsync(localDataDir, { idempotent: true });
    }
  } catch (error) {
    console.error("Error deleting directory:", error);
    return false;
  }
  console.log("Delete all data")
};

// Function to create a local backup of the data
const downloadBackup = async (token) => {
  const filename = `BACKUP_${new Date().toISOString().slice(0, 10)}_${token}.json`;
  try {
    const response = await fetch(getUserData(token));
    if (!response.ok) {
      throw new Error("Failed to download file");
    }
    const fileUri = FileSystem.documentDirectory + filename;
    const fileUriResult = await FileSystem.writeAsStringAsync(fileUri, await response.text());
    save(fileUri);
  } catch (error) {
    console.error("Failed to download file:", error);
  }
};

// Function to upload a backup of the data
const uploadBackup = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
    });
    if (result.assets[0].uri) {
      const backupDate = result.assets[0].name.split('_')[1]
      const jsonContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const jsonData = JSON.parse(jsonContent);
      const patientExist = await CLOUD.checkTokenExistence(jsonData.token)
      if(patientExist){
        await writeLocalData(jsonData.token, jsonData);
        console.log("Uploaded JSON:", jsonData);
        return {type: "success", data: jsonData, backupDate: backupDate}
        
      }else{
        console.log("Uploaded JSON ERROR: Questo Backup non è associato a nessun paziente.");
        return {type: "error", message: "Questo Backup non è associato a nessun paziente."}
      }
    }
  } catch (error) {
    throw new Error ("Failed to pick and upload file:", error);
  }
};

// Function to upload an image from the photo gallery to a local folder
const uploadFromGalleryToLocalFolder = async (imageName, token) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access media library was denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result)
    if (!result.canceled) {
      const fileUploadURI = result.assets[0].uri;
      const fileExtension = fileUploadURI.split('.').pop(); // Get the file extension
      const newFileName = `${imageName}.${fileExtension}`; // Rename with the original file extension
      const localFilePath = `${getUserDirectory(token)}/${newFileName}`;
      await FileSystem.copyAsync({ from: fileUploadURI, to: localFilePath });
      console.log('Image uploaded successfully to local folder:', localFilePath);
      return localFilePath;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const retrieveImageFromLocalFolder = async (imageName, token) => {
  try {
    const userDirectory = getUserDirectory(token);
    const files = await FileSystem.readDirectoryAsync(userDirectory);
    const matchingFiles = files.filter(file => file.startsWith(imageName));
    if (matchingFiles.length > 0) {
      const localFilePath = `${userDirectory}/${matchingFiles[0]}`;
      console.log('Image found in local folder:', localFilePath);
      return localFilePath;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving image:', error);
    return null;
  }
};


const shareQRCode = async (qrCodeData) => {
  try {
    if (!qrCodeData) {
      console.error("Dati del QR code non validi");
      return;
    }
    const qrCodeFileUri = `${FileSystem.documentDirectory}qrCode.png`;
    await FileSystem.writeAsStringAsync(qrCodeFileUri, qrCodeData, { encoding: FileSystem.EncodingType.Base64 });

    await save(qrCodeFileUri);
  } catch (error) {
    console.error("Errore durante lo share del QR code:", error);
  }
};

const save = async (uri) => {
  try {
    await shareAsync(uri);
  } catch (error) {
    console.error("Failed to share file:", error);
  }
};


// Exported object containing local data manipulation functions for external use.
export const LOCAL = {
  writeLocalData,
  readLocalData,
  existLocalFile,
  getAllUsers,
  checkUserFoldersExist,
  deleteLocalData,
  deleteAllLocalData,
  downloadBackup,
  uploadBackup,
  shareQRCode,
  uploadFromGalleryToLocalFolder,
  retrieveImageFromLocalFolder
};
