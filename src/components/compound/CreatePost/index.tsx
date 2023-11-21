import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/contexts/Theme";
import { fabric } from "fabric";
import { Avatar } from "@/components/primitive";
import CreatePostModal from "./CreatePostModal";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import classNames from "classnames";

export const CreatePost = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const { theme } = useContext(ThemeContext);

  //=======Server State

  const [colorTextSelected, setColorTextSelected] = useState("#fff");
  const [cropper, setCropper] = useState<Cropper | null>(null);
  // const [tagImageMode, setTagImageMode] = useState<boolean>(false);
  const [modeTextTool, setModeTextTool] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false); // open modal edit
  const [loadingButtonPublish, setLoadingButtonPublish] = useState<boolean>(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [textArea, setTextArea] = useState<string>("");
  const refImageEdit = useRef<HTMLImageElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [imagePreviewEdit, setImagePreviewEdit] = useState<string>("");
  const [showInputTextTool, setShowInPutTextTool] = useState<boolean>(false);
  const [textTool, setTextTool] = useState<any>();
  const [inputTextValue, setInputTextValue] = useState<string>("");

  //   useEffect(() => {
  //     if (cropper) {
  //       cropper.destroy();
  //       setCropper(null);
  //     }
  //     if (!modeEdit) {
  //       setTextTool(null);
  //       setModeTextTool(false);
  //       setShowInPutTextTool(false);
  //       setInputTextValue("");
  //     }
  //   }, [modeEdit]);

  //   const handleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files ? event.target.files[0] : null;
  //     if (file) {
  //       if (file["type"].includes("image")) {
  //         setPreview([URL.createObjectURL(file), ...preview]);
  //       } else if (file["type"].includes("video")) {
  //         return;
  //       } else return;
  //     }

  //     event.target.value = "";
  //   };

  //   const handleDeletePreview = (preview: string) => {
  //     setPreview((prev) => prev.filter((item) => item !== preview));
  //   };

  //   const handlePublish = async () => {
  //     const date: string = FormatDate();
  //     setLoadingButtonPublish(true);

  //     await addNewPost(preview, textArea, dataUser.dataUser.username, dataUser.dataUser.name, date, dataUser.dataUser.avatar);
  //     setLoadingButtonPublish(false);

  //     const PublishPost = new Promise<any>((resolve) => {
  //       const newListImage = preview.map((item) => ({ url: item, blurHash: "" }));

  //       dispatch(
  //         addNewPostState({
  //           id: (listPosts.length + 1).toString(),
  //           username: dataUser.dataUser.username,
  //           name: dataUser.dataUser.name,
  //           text: textArea,
  //           like: false,
  //           image: newListImage,
  //           createAt: date,
  //           avatar: dataUser.dataUser.avatar,
  //           likeCount: 0,
  //         })
  //       );

  //       resolve(true);
  //     });

  //     PublishPost.then(() => {
  //       setIsModalOpen(false);
  //       setPreview([]);
  //       setTextArea("");
  //     });
  //   };

  //   const handleCropImage = () => {
  //     setModeTextTool(false);
  //     setShowInPutTextTool(false);

  //     if (refImageEdit.current) {
  //       if (!cropper) {
  //         const cropper1 = new Cropper(refImageEdit.current, {
  //           aspectRatio: 0,
  //           viewMode: 0,
  //         });
  //         setCropper(cropper1);
  //       } else {
  //         cropper.destroy();
  //         setCropper(null);
  //       }
  //     }
  //   };

  //   const handleRotateImage = () => {
  //     setModeTextTool(false);
  //     setShowInPutTextTool(false);

  //     if (refImageEdit.current) {
  //       if (!cropper) {
  //         const cropper1 = new Cropper(refImageEdit.current, {
  //           aspectRatio: 0,
  //           viewMode: 0,
  //         });
  //         setCropper(cropper1);
  //       } else {
  //         cropper.rotate(90);
  //       }
  //     }
  //   };

  // const handleTagImage = () => {
  //   setModeTextTool(false);
  //   setShowInPutTextTool(false);

  //   if (cropper) {
  //     cropper.destroy();
  //     setCropper(null);
  //   }
  //   setTagImageMode((prev) => !prev);
  // };

  //   const handleTextTool = () => {
  //     if (cropper) cropper.destroy();
  //     setCropper(null);
  //     setModeTextTool((prev) => !prev);

  //     if (!textTool && showInputTextTool === modeTextTool) {
  //       setShowInPutTextTool((prev) => !prev);
  //     }
  //   };

  //   const handleOkCropImage = () => {
  //     if (cropper) {
  //       cropper.getCroppedCanvas() &&
  //         setPreview((prev) => prev.map((item) => (item === imagePreviewEdit ? cropper.getCroppedCanvas().toDataURL() : item)));
  //     }
  //     if (textTool) {
  //       setPreview((prev) => prev.map((item) => (item === imagePreviewEdit ? textTool.toDataURL() : item)));
  //     }
  //     setModeEdit(false);
  //   };

  //   const handleSaveTextTool = (colorTextSelected: string) => {
  //     // Create a new instance of Canvas
  //     if (!textTool && inputTextValue) {
  //       setShowInPutTextTool(false);
  //       const canvas = new fabric.Canvas("canvas");
  //       canvas.setDimensions({ width: refImageEdit.current?.offsetWidth || 0, height: refImageEdit.current?.offsetHeight || 0 });
  //       fabric.Image.fromURL(imagePreviewEdit, (img) => {
  //         if (img.width && img.height) {
  //           canvas.setBackgroundImage(imagePreviewEdit, canvas.renderAll.bind(canvas), {
  //             scaleX: (canvas.width as number) / img.width,
  //             scaleY: (canvas.height as number) / img.height,
  //           });
  //         }
  //       });

  //       // Create a new Text instance
  //       const text = new fabric.Text(inputTextValue, {
  //         fill: colorTextSelected,
  //         fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  //         fontStyle: "italic",
  //         fontWeight: "600",
  //         top: 50,
  //       });

  //       // Render the Text on Canvas
  //       canvas.add(text);
  //       setTextTool(canvas);
  //     }
  //   };

  return (
    <div className={classNames("ks-create-post", { "-dark": theme })}>
      <CreatePostModal open={openModal} onClose={() => setOpenModal(false)} />

      <div className="avatar">
        <Avatar src={userInfo?.avatar || ""} objectFit="cover" size="md" />
      </div>

      <div className="field" onClick={() => setOpenModal(true)}>
        What's on your my mind ?
      </div>
    </div>
  );
};
