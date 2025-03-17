// const RenderNewsContent = ({
//   description,
//   newsItem,
//   category_slug,
//   adsData,
// }) => {
//   const paragraphs = description?.split(/<\/?p[^>]*>/).filter(Boolean) || [];

//   const firstPart = paragraphs.slice(0, 2);
//   const secondPart = paragraphs.slice(2, 4);
//   const lastPart = paragraphs.slice(4).join("");

//   return `
//     <p>${firstPart.join("</p><p>")}</p>

//     ${newsItem ? `
//       <a
//         href="/${category_slug}/${newsItem?._id}"
//         class="print:hidden"
//         style="
//           border: 1px solid #D1D5DB;
//           display: flex;
//           border-radius: 0.25rem;
//           background-color: #F3F4F6;
//           gap: 1rem;
//           padding: 0.5rem;
//           margin-top: 1rem;
//           margin-bottom: 1rem;
//         "
//       >
//         <img
//           src="${newsItem?.main_image}"
//           alt=""
//           style="
//             width: 5rem;
//             height: 4rem;
//           "
//         />
//         <h3
//           style="
//             font-weight: bold;
//             color: #4B5563;
//             margin-top: 0.25rem;
//             display: -webkit-box;
//             -webkit-box-orient: vertical;
//             -webkit-line-clamp: 2;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           "
//         >
//           ${newsItem?.heading}
//         </h3>
//       </a>
//     ` : ""}

//     <p>${secondPart.join("</p><p>")}</p>

//     ${adsData ? `
//       <a target="_blank" rel="noreferrer" href="${adsData?.ads_link}">
//         <img
//           src="${adsData?.ads_image}"
//           alt="Advertisement"
//           class="print:hidden"
//           style="width: 100%; border-radius: 0.25rem; margin-top: 1rem; margin-bottom: 1rem;"
//         />
//       </a>
//     ` : ""}

//     <p>${lastPart}</p>
//   `;
// };

// export default RenderNewsContent;




const RenderNewsContent = ({
  description,
  newsItem,
  category_slug,
  adsData,
}) => {
  // Ensure the description is wrapped in a single container to simplify manipulation
  const styledDescription = description
    ?.replace(/class="ql-align-center"/g, 'style="text-align: center;"')
    .replace(
      /<ul>/g,
      '<ul style="margin-left: 1.5rem; list-style-type: disc;">'
    )
    .replace(/<li>/g, '<li style="margin-left: 2.5rem; line-height: 1.6;">');

  // Splitting content into parts for structured rendering
  const paragraphs =
    styledDescription?.split(/<\/?p[^>]*>/).filter(Boolean) || [];


  const firstPart = paragraphs.slice(0, 2);
  const secondPart = paragraphs.slice(2, 4);
  const lastPart = paragraphs.slice(4).join("");

  return `
    <p>${firstPart.join("</p><p>")}</p>

    ${
      newsItem
        ? `
      <a
        href="/${category_slug}/${newsItem?._id}"
        class="print:hidden"
        style="
          border: 1px solid #D1D5DB;
          display: flex;
          border-radius: 0.25rem;
          background-color: #F3F4F6;
          gap: 1rem;
          padding: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        "
      >
        <img
          src="${newsItem?.main_image}"
          alt=""
          style="
            width: 5rem;
            height: 4rem;
          "
        />
        <h3
          style="
            font-weight: bold;
            color: #4B5563;
            margin-top: 0.25rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          ${newsItem?.heading}
        </h3>
      </a>
    `
        : ""
    }

    <p>${secondPart.join("</p><p>")}</p>

    ${
      adsData
        ? `
      <a target="_blank" rel="noreferrer" href="${adsData?.ads_link}">
        <img
          src="${adsData?.ads_image}"
          alt="Advertisement"
          class="print:hidden"
          style="width: 100%; border-radius: 0.25rem; margin-top: 1rem; margin-bottom: 1rem;"
        />
      </a>
    `
        : ""
    }

    <p>${lastPart}</p>
  `;
};

export default RenderNewsContent;

