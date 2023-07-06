import { Button, Modal, Select, Spin } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiCloseLine, RiEdit2Fill, RiCropLine, RiArrowGoBackLine, RiImage2Fill, RiFontSize } from "react-icons/ri";
import "./createpost.scss";
import listColor from "../../assets/fake-data/listColor";
import { ThemeContext } from "../../contexts/Theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FormatDate from "../../utils/FormatDate";
import { addNewPost } from "../../assets/fake-data/Posts";
import { fabric } from "fabric";
import { addNewPostState } from "../../store/listPostsSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  //=======Server State
  const dataUser = useSelector((state: RootState) => state.auth);
  const listPosts = useSelector((state: RootState) => state.posts.listPosts);
  //=======Cilent State
  const [colorTextSelected, setColorTextSelected] = useState("#fff");
  const { theme } = useContext(ThemeContext);
  const [cropper, setCropper] = useState<Cropper | null>(null);
  // const [tagImageMode, setTagImageMode] = useState<boolean>(false);
  const [modeTextTool, setModeTextTool] = useState<boolean>(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false); // open modal edit
  const [loadingButtonPublish, setLoadingButtonPublish] = useState<boolean>(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [textArea, setTextArea] = useState<string>("");
  const refImageEdit = useRef<HTMLImageElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewEdit, setImagePreviewEdit] = useState<string>("");
  const [showInputTextTool, setShowInPutTextTool] = useState<boolean>(false);
  const [textTool, setTextTool] = useState<any>();
  const [inputTextValue, setInputTextValue] = useState<string>("");

  useEffect(() => {
    if (cropper) {
      cropper.destroy();
      setCropper(null);
    }
    if (!modeEdit) {
      setTextTool(null);
      setModeTextTool(false);
      setShowInPutTextTool(false);
      setInputTextValue("");
    }
  }, [modeEdit]);

  const hanleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file["type"].includes("image")) {
        setPreview([URL.createObjectURL(file), ...preview]);
      } else if (file["type"].includes("video")) {
        return;
      } else return;
    }

    event.target.value = "";
  };

  const handleDeletePreview = (preview: string) => {
    setPreview((prev) => prev.filter((item) => item !== preview));
  };

  const handlePublish = async () => {
    const date: string = FormatDate();
    setLoadingButtonPublish(true);

    await addNewPost(preview, textArea, dataUser.dataUser.username, dataUser.dataUser.name, date, dataUser.dataUser.avatar);
    setLoadingButtonPublish(false);

    const PublishPost = new Promise<any>((resolve) => {
      const newListImage = preview.map((item) => ({ url: item, blurHash: "" }));

      dispatch(
        addNewPostState({
          id: (listPosts.length + 1).toString(),
          username: dataUser.dataUser.username,
          name: dataUser.dataUser.name,
          text: textArea,
          like: false,
          image: newListImage,
          createAt: date,
          avatar: dataUser.dataUser.avatar,
          likeCount: 0,
        })
      );

      resolve(true);
    });

    PublishPost.then(() => {
      setIsModalOpen(false);
      setPreview([]);
      setTextArea("");
    });
  };

  const handleCropImage = () => {
    setModeTextTool(false);
    setShowInPutTextTool(false);

    if (refImageEdit.current) {
      if (!cropper) {
        const cropper1 = new Cropper(refImageEdit.current, {
          aspectRatio: 0,
          viewMode: 0,
        });
        setCropper(cropper1);
      } else {
        cropper.destroy();
        setCropper(null);
      }
    }
  };

  const handleRotateImage = () => {
    setModeTextTool(false);
    setShowInPutTextTool(false);

    if (refImageEdit.current) {
      if (!cropper) {
        const cropper1 = new Cropper(refImageEdit.current, {
          aspectRatio: 0,
          viewMode: 0,
        });
        setCropper(cropper1);
      } else {
        cropper.rotate(90);
      }
    }
  };

  // const handleTagImage = () => {
  //   setModeTextTool(false);
  //   setShowInPutTextTool(false);

  //   if (cropper) {
  //     cropper.destroy();
  //     setCropper(null);
  //   }
  //   setTagImageMode((prev) => !prev);
  // };

  const handleTextTool = () => {
    if (cropper) cropper.destroy();
    setCropper(null);
    setModeTextTool((prev) => !prev);

    if (!textTool && showInputTextTool === modeTextTool) {
      setShowInPutTextTool((prev) => !prev);
    }
  };

  const handleOkCropImage = () => {
    if (cropper) {
      cropper.getCroppedCanvas() &&
        setPreview((prev) => prev.map((item) => (item === imagePreviewEdit ? cropper.getCroppedCanvas().toDataURL() : item)));
    }
    if (textTool) {
      setPreview((prev) => prev.map((item) => (item === imagePreviewEdit ? textTool.toDataURL() : item)));
    }
    setModeEdit(false);
  };

  const handleSaveTextTool = (colorTextSelected: string) => {
    // Create a new instance of Canvas
    if (!textTool && inputTextValue) {
      setShowInPutTextTool(false);
      const canvas = new fabric.Canvas("canvas");
      canvas.setDimensions({ width: refImageEdit.current?.offsetWidth || 0, height: refImageEdit.current?.offsetHeight || 0 });
      fabric.Image.fromURL(imagePreviewEdit, (img) => {
        if (img.width && img.height) {
          canvas.setBackgroundImage(imagePreviewEdit, canvas.renderAll.bind(canvas), {
            scaleX: (canvas.width as number) / img.width,
            scaleY: (canvas.height as number) / img.height,
          });
        }
      });

      // Create a new Text instance
      const text = new fabric.Text(inputTextValue, {
        fill: colorTextSelected,
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontStyle: "italic",
        fontWeight: "600",
        top: 50,
      });

      // Render the Text on Canvas
      canvas.add(text);
      setTextTool(canvas);
    }
  };

  return (
    <div className={`create-post ${theme && "dark"}`}>
      {modeEdit && (
        <Modal
          className={`modal-edit ${theme && "modal-dark"}`}
          style={{ zIndex: "10" }}
          title="Photo detail"
          open={modeEdit}
          onCancel={() => setModeEdit(false)}
          onOk={handleOkCropImage}
        >
          <div className="photo-preview-detail">
            <div className="options-group">
              <ul>
                <li onClick={handleCropImage}>
                  <span>
                    <RiCropLine></RiCropLine>
                  </span>
                  Crop
                </li>
                <li onClick={handleRotateImage}>
                  <span>
                    <RiArrowGoBackLine></RiArrowGoBackLine>
                  </span>
                  Rotate
                </li>
                {/* <li onClick={handleTagImage}>
                  <span>
                    <RiPriceTag3Fill></RiPriceTag3Fill>
                  </span>
                  Tag photo
                </li> */}
                <li onClick={handleTextTool}>
                  <span>
                    <RiFontSize></RiFontSize>
                  </span>
                  Text Tool
                </li>
              </ul>
              {showInputTextTool && (
                <div className="options-edit-text">
                  <label htmlFor="">Select Text Color</label>
                  <ul>
                    {listColor.map((item) => (
                      <li
                        onClick={() => setColorTextSelected(item)}
                        key={item}
                        style={{ backgroundColor: `${item}`, border: `${item === colorTextSelected ? "2px solid blue" : ""}` }}
                      ></li>
                    ))}
                  </ul>
                  <Button type="primary" onClick={() => handleSaveTextTool(colorTextSelected)}>
                    Save Text
                  </Button>
                </div>
              )}
            </div>
            <div className="preview-edit-photo">
              <div className="backgr-stories-blur">
                <img src={imagePreviewEdit} draggable="false" />
              </div>
              {/* {tagImageMode && <div className="title-tag">Click on the photo to start tagging</div>} */}
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <img src={imagePreviewEdit} alt="" ref={refImageEdit} />
                <canvas id="canvas" style={{ display: `${modeTextTool ? "block" : "none"}` }}></canvas>
                {showInputTextTool && (
                  <div className="input-text">
                    <textarea
                      style={{ color: `${colorTextSelected}`, caretColor: `${colorTextSelected}` }}
                      placeholder="Start typing"
                      value={inputTextValue}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputTextValue(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Modal
        className={`modal-create-post ${theme && "modal-dark"}`}
        title="Create post"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setPreview([]);
        }}
        onOk={handlePublish}
      >
        <div style={{ display: "flex", gap: "8px", margin: "10px 0px" }}>
          <div className="avatar-friend">
            {dataUser.dataUser.avatar ? (
              <img src={dataUser.dataUser.avatar} />
            ) : (
              dataUser.dataUser.name.slice(0, 2).toLocaleUpperCase()
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "17px", fontWeight: "600" }}>{dataUser.dataUser.name}</span>
            <Select
              defaultValue="onlyme"
              style={{ width: 100 }}
              onChange={() => {}}
              options={[
                { value: "onlyme", label: "Only me" },
                { value: "public", label: "Public" },
              ]}
            />
          </div>
        </div>
        <textarea
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontFamily: "system-ui",
            resize: "none",
            fontSize: "20px",
            minHeight: "100px",
            backgroundColor: "transparent",
            color: `${theme ? "white" : "black"}`,
          }}
          placeholder={`What's on your mind, ${dataUser.dataUser.name}?`}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextArea(e.target.value)}
          value={textArea}
        />
        <div className="btn-group">
          <span style={{ fontWeight: "600", fontSize: "16px" }}>Add to your post</span>
          <div className="input-group">
            <label htmlFor="uploadImg" className="upload">
              <RiImage2Fill></RiImage2Fill>
            </label>

            <input type="file" id="uploadImg" onChange={hanleOnChangeFile} />
          </div>
        </div>

        {preview.length !== 0 && (
          <ul className={`list-img-preview list-image-post-${preview.length < 5 ? preview.length : "default"}`}>
            {preview.map(
              (item, index) =>
                index < 4 && (
                  <li key={item}>
                    <span className="preview-close" onClick={() => handleDeletePreview(item)}>
                      <RiCloseLine></RiCloseLine>
                    </span>
                    <span
                      className="preview-edit"
                      onClick={() => {
                        setModeEdit(true);
                        setImagePreviewEdit(item);
                      }}
                    >
                      <RiEdit2Fill></RiEdit2Fill> Edit
                    </span>
                    <img src={item} alt="imageUpload" />
                  </li>
                )
            )}
            {preview.length > 4 && (
              <li>
                <span className="post-image-count">{`+${preview.length - 4}`}</span>
                <img src={preview[4]} alt="" />
              </li>
            )}
          </ul>
        )}

        {loadingButtonPublish && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: "2",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </Modal>
      <div style={{ display: "flex", gap: "7px" }}>
        <div className="avatar-friend">
          {dataUser.dataUser.avatar ? (
            <img src={dataUser.dataUser.avatar} />
          ) : (
            dataUser.dataUser.name.slice(0, 2).toLocaleUpperCase()
          )}
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            backgroundColor: `${theme ? "#323232" : "rgb(235 235 235)"}`,
            padding: "0px 20px",
            borderRadius: "30px",
            cursor: "pointer",
          }}
        >
          <input
            className="inputdefault-create"
            type="text"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "transparent",
              pointerEvents: "none",
            }}
            placeholder={`What's on your my mind, ${dataUser.dataUser.name}`}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
