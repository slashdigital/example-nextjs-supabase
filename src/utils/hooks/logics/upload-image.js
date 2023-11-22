import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTimeout } from "@/utils/hook";
import { logger } from "@/utils/log";

export const useSupabaseUploadFile = () => {
  const [result, setResult] = React.useState({
    fileUploaded: null,
    status: "nil",
    context: {},
  });
  const supabase = useSupabaseClient();
  const { wait, clear: clearTimeout } = useTimeout();

  const clear = () => {
    setResult(null);
  };

  const upload = async ({
    fileToUpload,
    _fileName = null,
    filePath = "",
    fileStore = "uxui",
    tableName = "images",
    context = {},
  }) => {
    // Start upload the file
    logger.debug("Start uploading file", fileToUpload);
    if (fileToUpload) {
      const extensions = fileToUpload.name.split(".");
      const extension = extensions[extensions.length - 1];
      const fileName = _fileName || `${uuidv4()}.${extension}`;
      logger.log("File to Supabase data", extension, filePath, fileName);

      const fileData = {
        file_name: fileName,
        file_path: filePath,
        url: "",
      };

      const { data: fileUploaded, error: errorUpload } = await supabase.storage
        .from(fileStore)
        .upload(`${filePath}/${fileName}`, fileToUpload, {
          cacheControl: "3600",
          upsert: false,
        });

      if (errorUpload) {
        logger.error("Error uploading file", errorUpload);
        throw errorUpload;
      }
      logger.debug("Start saving to Supabase");
      const { data: fileStored, error: errorFileStored } = await supabase
        .from(tableName)
        .insert({ ...fileData })
        .select();
      logger.debug("New file stored", fileStored);
      if (fileStored.length) {
        setResult({
          fileUploaded: fileStored[0],
          status: "success",
          context: {
            ...context,
          },
        });
      } else {
        setResult({
          fileUploaded: null,
          status: "failed",
          context: {
            ...context,
          },
        });
        wait(1000, () => {
          setResult({
            fileUploaded: null,
            status: "nil",
            context: {},
          });
        });
        logger.error("Error uploading file", errorFileStored);
        throw errorFileStored;
      }
    }
  };

  return { result, upload, clear };
};
