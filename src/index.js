/*!
 * tinymce-imgur Plugin
 * Written by Maxhou00 (houdais.m@gmail.com)
 * Tested with Tinymce v6.0.0 (https://www.tiny.cloud/)
 */

let ConvertStringToHTML = function (str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");

  return doc.body.childNodes[0];
};

tinymce.PluginManager.add("tinymceImgur", (editor) => {
  const initOptions = () => {
    editor.options.register("tinymceImgur_client_id", {
      processor: "string",
    });
  };

  var fileSelector = document.getElementById("imgurInput");
  var imageCounter = document.getElementById("image_count");

  initOptions();
  var imgurClientId = editor.options.get("tinymceImgur_client_id");

  const initUploader = () => {
    var tinyEditorArea = document.getElementsByClassName("tox-edit-area")[0];
    var footerCounter = `
      <div id='image_count' style="background-color: rgba(20, 20, 20, 0.6); display:none; position:absolute; z-index:1; bottom:0; left:0; right:0; padding: 5px; color: rgb(255, 255, 255);">
        Nothing to upload
      </div>
    `;

    fileSelector = document.createElement("input");

    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("multiple", "multiple");
    fileSelector.setAttribute("id", "imgurInput");
    fileSelector.style.display = "none";
    tinyEditorArea.append(fileSelector);
    fileSelector.addEventListener("change", uploadFiles);
    tinyEditorArea.prepend(ConvertStringToHTML(footerCounter));
    imageCounter = document.getElementById("image_count");
  };

  const resetUploader = () => {
    imageCounter.textContent = "Nothing to upload";
    fileSelector.val = null;
  };

  const uploadFiles = (event) => {
    var files = event.target.files;
    var uploadingImgCount = files.length;
    imageCounter.style.display = "unset";

    Array.from(files).forEach(function (file) {
      let form = new FormData();

      form.append("image", file);
      $.ajax({
        url: "https://api.imgur.com/3/image",
        headers: { Authorization: "Client-ID " + imgurClientId },
        type: "POST",
        data: form,
        cache: false,
        contentType: false,
        processData: false,
      }).always(function (result) {
        updateImageCounterDisplay(uploadingImgCount);
        uploadingImgCount--;
        if (result.status != 200) {
          alert("Failed to upload: " + result.responseJSON.data.error.message);
        } else {
          img_tag = "<p><img src=" + result.data.link + "></img><br/></p>";
          editor.insertContent(img_tag);
        }
        if (uploadingImgCount == 0) {
          imageCounter.style.display = "none";
        }
      });
    });
  };

  const updateImageCounterDisplay = (counter) => {
    if (counter <= 1) {
      imageCounter.textContent = counter + " image is uploading...";
    } else {
      imageCounter.textContent = counter + " images are uploading...";
    }
  };

  const openDialog = () => {
    if (fileSelector) {
      resetUploader();
    } else {
      initUploader();
    }
    fileSelector.click();
  };

  editor.ui.registry.addIcon(
    "imgur_icon",
    `
    <svg width="24" height="24" version="1.0" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 56) scale(.1 -.1)">
    <path d="m44 542c-41-32-44-53-44-270v-210l58-62h222 222l58 58v222 222l-62 58h-217c-190 0-219-3-237-18zm470-18c23-22 20-25-11-8-42 21-406 20-447-1-30-16-30-16-11 5 17 19 29 20 236 20 184 0 220-2 233-16zm-192-79c10-22 9-29-9-46-37-37-91 0-72 49 12 33 65 31 81-3zm-14-97c17-17 17-239 0-256-16-16-33-15-52 4-13 12-16 39-16 128 0 114 6 136 40 136 9 0 21-5 28-12z"/>
    </g>
    </svg>
    `
  );

  editor.ui.registry.addButton("tinymceImgur", {
    icon: "imgur_icon",
    onAction: () => {
      openDialog();
    },
  });

  /* Return the metadata for the help plugin */
  return {
    getMetadata: () => ({
      name: "tinymce-imgur plugin",
      url: "https://github.com/Maxhou00/tinymce-imgur",
    }),
  };
});
