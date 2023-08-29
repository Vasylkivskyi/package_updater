import fetch from "node-fetch";
import fs from "fs";

const PACKAGE_NAME = "test-repo";
const PACKAGE_VERSION = "1.1.0";
const WORKSPACE_NAME = "pavlovasylkivskyi";

const ACCESS_TOKEN =
  "ATCTT3xFfGN016VFKXf1pcFC9fLn4EMyt8MPnLvxnkWdGH7W3yqIJj8KKRtAdDGgWTYzS6jWafl_0QfgHnMshLarT4aWiRjkxtMVSTVWrj9nQ0bSpklNJxYe5mIkbw6HWun7lcq5eKsBCJ_rQ_q3Fb8iOG0QoiP8Bpmfur320IN--n63byHi11o=892D6685";

const getFileDataFromBitBucket = async () => {
  const fileData = await fetch(
    `https://api.bitbucket.org/2.0/repositories/${WORKSPACE_NAME}/${PACKAGE_NAME}/src/main/package.json`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return fileData;
};

const createFolder = () => {
  const folderName = "./temp";

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
};

const writeFile = (fileData) => {
  fs.writeFile(
    "./temp/package.json",
    JSON.stringify(fileData, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );
};

const pushFileToBitBucket = async (fileData) => {
  // TODO Not ready, need to be implemented
};

(async () => {
  try {
    const fileData = await getFileDataFromBitBucket();
    fileData.version = PACKAGE_VERSION;
    createFolder();
    writeFile(fileData);
    await pushFileToBitBucket(fileData);
  } catch (e) {
    // TODO need to add error handling later
    console.log(e.message);
  }
})();
