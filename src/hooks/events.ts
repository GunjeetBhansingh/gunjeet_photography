import { API_KEY, FOLDER_ID, GOOGLE_API } from "../constants/apis";

export const fetchFolders = async () => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${API_KEY}`
  );

  const data = await response.json();
  return data.files;
};

export const fetchAllImages = async () => {
    const folders = await fetchFolders();
    console.log("fetching folder id", folders);
    const imagePromises = folders.map( (folder:any) => fetch(`https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&key=${API_KEY}`).then( (res) => res.json()));
    const results = await Promise.all(imagePromises);
    const allImages = results.flatMap( (result) => result.files || []);
    return allImages;
}
;
export const fetchImagesById = async (id:string) => {
    const response = await fetch(`${GOOGLE_API}v3/files?q='${id}'+in+parents+and+mimeType+contains+'image/'+and+trashed=false&fields=files(id,name,mimeType)&key=${API_KEY}`);
    const data = await response.json();
    return data;
}
;
