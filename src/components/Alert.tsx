"use client";
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const Alert = ({open, onSuccess, setIsAlertOpen}:{open: boolean, onSuccess: ()=>void, setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <AlertDialog open={open}>
    <AlertDialogTrigger asChild>
      {/* <Button variant="outline">Show Dialog</Button> */}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
    Do you really want to create one more account ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onSuccess}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Alert
