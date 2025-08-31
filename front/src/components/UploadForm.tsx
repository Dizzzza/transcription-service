import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { useGenerateUploadUrl, useCreateTask } from "../graphql/hooks";

type Props = {
  onTaskCreated: (task: { id: string; status: string; s3Url: string }) => void;
};

export const UploadForm: React.FC<Props> = ({ onTaskCreated }) => {
  const [generateUploadUrl] = useGenerateUploadUrl();
  const [createTask] = useCreateTask();
  const customRequest = async (options: RcCustomRequestOptions) => {
    const file = options.file as RcFile;
    try {
      const { data } = await generateUploadUrl({
        variables: { filename: file.name },
      });
      if (!data) throw new Error("No data from server");
      const uploadUrl: string = data?.generateUploadUrl.uploadUrl;
      if (!uploadUrl) throw new Error("No upload URL");

      await uploadToS3(uploadUrl, file, (percent) => {
        options.onProgress?.({ percent });
      });

      const { data: taskData } = await createTask({
        variables: {
          id: file.uid,
          s3Url: uploadUrl.split("?")[0],
        },
      });

      const task = taskData?.createTask;
      if (!task) throw new Error("No task created");

      onTaskCreated(task);

      // 4) success
      message.success(`${file.name} uploaded`);
      options.onSuccess?.(null, file);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        message.error(`Upload failed: ${err.message}`);
        options.onError?.(err);
      } else {
        console.error(err);
        message.error(`Upload failed: ${String(err)}`);
      }
    }
  };

  const uploadToS3 = (
    url: string,
    file: RcFile,
    onProgress?: (p: number) => void
  ) =>
    new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);

      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable && onProgress) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`Upload failed with status ${xhr.status}`));
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(file);
    });

  return (
    <Upload customRequest={customRequest} showUploadList={false}>
      <Button icon={<UploadOutlined />}>Загрузить аудио</Button>
    </Upload>
  );
};
