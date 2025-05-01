import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';
import { MessageCircle } from 'lucide-react';

function UserInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { backendurl, usertoken, alluser } = useContext(AppContext);

  const getUserDetail = async () => {
    try {
      const { data } = await axios.post(`${backendurl}/userprofile`, { id }, {
        headers: { token: usertoken }
      });
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id) getUserDetail();
  }, [id]);

  const getRelatedUsers = () => {
    if (!user || !alluser || alluser.length === 0) return [];

    return alluser.filter((other) => {
      if (!other || !other._id) return false;
      if (String(other._id) === String(user._id)) return false; // Prevent matching with itself

      const mySkills = user.skill?.map(s => s?.trim().toLowerCase()) || [];
      const otherSkills = other.skill?.map(s => s?.trim().toLowerCase()) || [];

      return mySkills.some(skill => otherSkills.includes(skill));
    });
  };

  const relatedUsers = getRelatedUsers();

  return (
    <div className='p-4 -mt-4'>

    <div className="mt-4 p-4 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg text-white">
      {user ? (
        <>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4">
            <img
              className="w-[300px] h-[300px] rounded-full object-cover border-4 border-white"
              src={user?.image}
              alt="Profile"
            />
            <div className="flex-1">
              <div className='flex justify-between'>
              <h1 className="text-4xl font-bold mb-2 text-center md:text-left">{user?.name}</h1>
<div onClick={()=>navigate(`/message/${id}`)} className='flex items-center gap-2 border px-2 mb-2 bg-blue-500 text-white text-xl font-bold rounded-xl outline-none'>
<button>message</button>
<MessageCircle/>
</div>
              </div>
              <p className="text-lg text-center md:text-left bg-black mt-2 px-4 py-2 rounded-md mb-4">{user?.email}</p>

              <div>
                <h2 className="text-2xl font-semibold underline mb-2">Skills:</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside">
                  {user?.skill?.map((sk, i) => (
                    <li key={i} className="capitalize">{sk}</li>
                  ))}
                </ul>
              </div>

              {user?.learn?.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold underline mb-2">Want to Learn:</h2>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside">
                    {user.learn.map((sk, i) => (
                      <li key={i} className="capitalize">{sk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-teal-800 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold underline mb-4">Description:</h2>
            <p className="text-lg ml-4 font-serif">{user?.description || "No description available."}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-4xl text-blue-400 font-serif font-bold  mb-6 text-center">Users with Similar Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedUsers.length > 0 ? (
                relatedUsers.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => { navigate(`/profile/${item._id}`); window.scrollTo(0, 0); }}
                    className="bg-gray-800 hover:bg-gray-700 transition-all p-4 rounded-lg cursor-pointer shadow-lg"
                  >
                    <img
                      src={item.image}
                      className="w-full h-[200px] object-cover rounded-md mb-4"
                      alt={item.name}
                      />
                    <h3 className="text-xl font-bold text-center mb-2">{item.name}</h3>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Top Skills:</h4>
                      <ul className="list-disc list-inside ml-4">
                        {item.skill?.slice(0, 3).map((sk, i) => (
                          <li key={i} className="capitalize">{sk}</li>
                        ))}
                      </ul>
                    </div>

                    {item.learn?.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold">Learning Interests:</h4>
                        <ul className="list-disc list-inside ml-4">
                          {item.learn.slice(0, 3).map((sk, i) => (
                            <li key={i} className="capitalize">{sk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-xl">No related users found.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-2xl mt-12">Loading user information...</p>
      )}
    </div>
      </div>
  );
}

export default UserInfo;
