import Sort from "@/app/components/Sort";
import { FileType, SearchParamProps } from "@/types";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import React from "react";
import { Models } from "node-appwrite";
import Card from "@/app/components/Card";
import {
  convertFileSize,
  getFileTypesParams,
  getUsageSummary
} from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const url = `/${type}`;
  // console.log(url);

  const [files, totalSpace] = await Promise.all([
    getFiles({ types, searchText, sort }),
    getTotalSpaceUsed()
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);
  const summary = usageSummary.find((summary) => summary.url === url) || null;
  console.log(summary?.size);

  // console.log(usageSummary);
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{convertFileSize(summary?.size)}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort By:</p>

            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            // <h1 key={file.$id} className="h1">
            //   {file.name}
            // </h1>

            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded.</p>
      )}
    </div>
  );
};

export default Page;
