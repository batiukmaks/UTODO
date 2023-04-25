import React from 'react'
import GroupMemberInterface from './GroupMemberInterface'

const GroupMembers = () => {
  return (
    <div className="tab-pane fade show active">
      <div className="container signup-form">
        <ul className="list-unstyled members-list">
          {members.map((member) => (
            <li className="row row-cols-1 row-cols-lg-2 py-2 border-bottom">
              <p className="col my-0">{member.full_name}</p>
              <p className="my-0">{member.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GroupMembers
const members: GroupMemberInterface[] = [
  {
    full_name: "James Bond",
    email: "realdilf007@gmail.com"
  },
  {
    full_name: "Snoop Dogg",
    email: "smokeweedeveryday@gmail.com"
  }
]