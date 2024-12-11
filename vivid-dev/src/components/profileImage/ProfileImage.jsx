function ProfileImage({ profileUrl, firstName, lastName }) {
  return (
    <>
      {profileUrl ? (
        <img
          className="rounded-full shadow-sm"
          src={profileUrl}
          alt={firstName + lastName}
        />
      ) : (
        <div className="bg-blue-600 rounded-[50%] m-auto h-[100%] w-[100%] flex items-center justify-center text-black dark:text-white ">
          {firstName?.[0] || "N"}
          {lastName?.[0] || "A"}
        </div>
      )}
    </>
  );
}

export { ProfileImage };
