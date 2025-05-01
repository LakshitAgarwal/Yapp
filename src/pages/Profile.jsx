import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  User,
  Calendar,
  ShieldCheck,
  Upload,
  Loader,
  LoaderCircle,
} from "lucide-react";
import defaultPfp from "../assets/defaultPfp.png";

const Profile = () => {
  const { authUser, isUpdatingProfile, updatePfp } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    // first lets grab the image that the user has uploaded.
    const userUploadedImage = e.target.files[0];
    if (!userUploadedImage) return;

    // some standard code while reading an image
    const reader = new FileReader();
    // now we want out image to be read as an url
    reader.readAsDataURL(userUploadedImage);

    // now we have to convert this to a bae64 string
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updatePfp(base64Image);
    };
  };

  return (
    <div className="min-h-screen px-5 py-10 ">
      <div className="max-w-6xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg md:my-20  ">
        {/* Profile header */}
        <div className="mb-10 border-b border-base-300 pb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
          <p className="text-base-content/70 mt-2">
            Welcome to your personal profile page!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile image section */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <img
                  src={selectedImage || authUser.profilePic || defaultPfp}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-base-300 shadow-md"
                />
              </div>

              <label
                className={`${
                  isUpdatingProfile
                    ? "cursor-not-allowed btn btn-primary gap-2"
                    : "btn btn-primary gap-2"
                }`}
              >
                {isUpdatingProfile ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                <span>{isUpdatingProfile ? "Uploading" : "Upload Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>

          {/* User information section */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal info section */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold text-primary">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-base-content mb-1"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 z-30 pl-3 flex items-center">
                        <User className="text-base-content/60" size={18} />
                      </span>
                      <input
                        id="name"
                        type="text"
                        className="input input-bordered w-full pl-10 cursor-not-allowed"
                        value={authUser?.fullName}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-30">
                        <svg
                          className="h-5 w-5 text-base-content/50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                          >
                            <rect
                              width="20"
                              height="16"
                              x="2"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </g>
                        </svg>
                      </div>
                      <input
                        className="input input-bordered w-full pl-10 cursor-not-allowed"
                        id="email"
                        type="email"
                        value={authUser?.email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account information section */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold text-primary">
                  Account Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-base-200 rounded-lg">
                    <div className="mr-4 bg-primary/20 p-2 rounded-full">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">
                        Member Since
                      </p>
                      <p className="font-medium">
                        {new Date(authUser.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-base-200 rounded-lg">
                    <div className="mr-4 bg-success/20 p-2 rounded-full">
                      <ShieldCheck size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">
                        Account Status
                      </p>
                      <div className="flex items-center">
                        <p className="font-medium text-green-500">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
