import { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
// import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import parser from "html-react-parser";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export default function QuillWrapper({ data, onChange, ...props }) {
  const quillRef = useRef();
  
  // let handleChange = (e) => {
  //   console.log(e);
  //   setData(e);
  // };

  // Custom image upload handler
  function imgHandler() {
    const quill = quillRef.current.getEditor();
    console.log(quill);
    var range = quill.getSelection();
    var value = prompt("What is the image URL");
    if (value) {
      quill.insertEmbed(range.index, "image", value);
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          ["link", "image", "video"],
        ],
        handlers: { image: imgHandler }, // Custom image handler
      },
    }),
    []
  );

  return (
    <div className="w-[100%] flex items-center justify-center pt-6">
      <div className="w-[90%]">
        <ReactQuill
          forwardedRef={quillRef}
          modules={modules}
          value={data.body}
          onChange={(e)=>onChange({...data, body: e})}
          {...props}
        />
      </div>
    </div>
  );
}
