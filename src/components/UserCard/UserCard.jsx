import React from 'react';

const UserCard = ({userData}) => {
    const {firstname, lastname, age, gender, photoURL, skills} = userData;
  return (
   <div className="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src={photoURL}
      alt={`${firstname}'s photo`} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{`${firstname} ${lastname}`}</h2>
    <p>Skills: {Array.isArray(skills) ? skills.join(', ') : ''}</p>
    <p>Age: {age}</p>
    <p>Gender: {gender}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary bg-green-400 text-amber-100">Connect</button>
      <button className="btn btn-primary bg-red-500 text-amber-100">Ignore</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
