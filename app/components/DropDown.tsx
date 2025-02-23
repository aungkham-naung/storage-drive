"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import { ActionType } from "@/types";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  deleteFile,
  renameFile,
  updateFileUsers
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails } from "./FileContentModal";
import { ShareInput } from "./FileContentModal";
import { getCurrentUser } from "@/lib/actions/user.actions";

const DropDown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [emails, setEmails] = useState<string[]>(file.users || []);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      // console.log("user", user);
      if (user) setCurrentUserId(user.accountId);
    };

    fetchUser();
  }, [file.ownerId]);

  const isOwner = currentUserId === file.accountId;
  // console.log("isOwner", isOwner);

  const path = usePathname();

  const closeAllModal = () => {
    setIsModalOpen(false);
    setIsDropDownOpen(false);
    setAction(null);
    setName(file.name);
    //Set email to false (sharing)
  };

  const handleSubmit = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: async () => {
        if (!isOwner) return false;
        const result = await renameFile({
          fileId: file.$id,
          name,
          extension: file.extension,
          path
        });

        if (result) {
          file.name = name;
        }

        return result;
      },

      share: async () => {
        if (!isOwner) return false;

        const updatedEmails = Array.from(new Set([...emails, ...file.users]));

        const result = await updateFileUsers({
          fileId: file.$id,
          emails: updatedEmails,
          path
        });

        if (result) setEmails(updatedEmails);

        return result;
      },

      delete: async () =>
        deleteFile({
          fileId: file.$id,
          bucketFileId: file.bucketFileId,
          path
        })
    };

    success = await actions[action.value as keyof typeof actions]();
    if (success) closeAllModal();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path
    });

    if (success) setEmails(updatedEmails);
    closeAllModal();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog-button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {value === "details" && <FileDetails file={file} />}

          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}

          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete {` `}
              <span className="delete-file-name">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModal} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="modal-submit-button">
              {isLoading ? (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="Loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              ) : (
                <p className="capitalize">{value}</p>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                )
                  setIsModalOpen(true);
              }}
              disabled={
                !isOwner &&
                ["rename", "share", "delete"].includes(actionItem.value)
              }
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default DropDown;
