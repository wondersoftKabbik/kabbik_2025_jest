import { books } from "./static/myplaylist.utils";

export default function BookStack() {
  

  return (
    <div className="relative w-72 h-64">
      {/* {books.map((book, index) => (
        <img
          key={index}
          src={book.src}
          alt={`Book ${index + 1}`}
          className="absolute w-44 border-4 border-gray-400 rounded"
          style={{
            left: `${index * +16}px`,
            zIndex: book.zIndex,
            top: `${100-index * (5)}px`,
            height: `${177 + index * 20}px`,
            boxShadow: book.shadow
          }}
        />
      ))} */}
    </div>
  );
}