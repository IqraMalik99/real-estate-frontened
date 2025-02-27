import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowList() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();
  let [think, setThink] = useState(false);
  useEffect(() => {
    let getting = async () => {
      try {
        console.log("go in show List");

        setThink(true);
        const response = await axios.get("https://realestae-backened-production.up.railway.app/list/show", {
          withCredentials: true,
        });
        setData(response.data.data);
        setThink(false);
      } catch (error) {
        setThink(false);
        console.log(`Error: ${error}`);
      }
    };
    getting();
  }, []); //[data]

  let detailHandler = (id) => {
    console.log(id);
    navigate(`/all/${id}`);
  };
  let deleteItem = async (e, id) => {
    // e.preventDefault();
    console.log(id);
    const response = await axios.post(
      `https://realestae-backened-production.up.railway.app/list/delete/${id}`,
      {},
      { withCredentials: true }
    );
    console.log(response);
    setData((prev) => {
      const updated = prev.filter((value) => value._id !== response._id);
      return updated;
    });
  };
  let updateItem = async (id) => {
    console.log(id);
    navigate(`/update/${id}`);
  };

  return (
    <div>
      {think ? (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="w-16 h-16 border-4 border-t-4 border-black border-t-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mx-0 mt-24 w-screen h-full">
          <div className=" overflow-hidden flex flex-col justify-center items-center">
            <div className="text-white text-2xl font-bold text-center my-5">
              MY &nbsp; LIST
            </div>
            <div className="w-10/12 h-auto overflow-x-hidden flex flex-wrap gap-4 justify-center items-center px-4">
              {data.length > 0 &&
                data.map((obj) => (
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                      key={obj._id}
                      className="w-3/4 md:w-1/2 lg:w-1/4 h-1/5 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center text-center"
                      style={{ height: "20%" }} // Adjust height if necessary
                    >
                      {/* Image */}
                      <img
                        src={obj.imageUrl[0]}
                        alt="Card Image"
                        className="w-full h-48 object-cover rounded-md mb-4"
                        onClick={() => detailHandler(obj._id)}
                      />

                      {/* Title */}
                      <h3
                        className="text-xl text-white font-semibold mb-2"
                        onClick={() => detailHandler(obj._id)}
                      >
                        {obj.name}
                      </h3>

                      {/* Content */}
                      <p
                        className="text-white mb-4"
                        onClick={() => detailHandler(obj._id)}
                      >
                        {obj.detail.substring(0, 100)}...
                      </p>

                      {/* Buttons */}
                      <div className="flex justify-around w-full">
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                          onClick={() => updateItem(obj._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                          onClick={(e) => deleteItem(e, obj._id)}
                        >
                          Delete
                        </button>
                      </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowList;
