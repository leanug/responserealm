'use client'

import React, { useState } from "react"

import { 
  HandThumbUpIcon, 
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon, ClockIcon, XCircleIcon, DocumentDuplicateIcon
} from "@heroicons/react/24/solid"

export default function PostCard() {
  const [selectedStatus, setSelectedStatus] = useState("Status")

  const statuses = [
    { name: "New", icon: <DocumentDuplicateIcon className="w-5 h-5" /> },
    { name: "In Progress", icon: <ClockIcon className="w-5 h-5" /> },
    { name: "Completed", icon: <CheckCircleIcon className="w-5 h-5" /> },
    { name: "Rejected", icon: <XCircleIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-between items-center">
          <div className="flex gap-3">
            <div className="flex flex-row gap-1 items-center">
              <HandThumbUpIcon className="size-5" /> 10
            </div>
            <div className="flex flex-row gap-1 items-center">
              <ChatBubbleBottomCenterTextIcon className="size-5" /> 0
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-end">
            <button>Delete</button>
            <button>View</button>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn">{selectedStatus}</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-1">
                {statuses.map((status) => (
                  <li key={status.name}>
                    <a onClick={() => setSelectedStatus(status.name)}>
                      {status.icon}
                      {status.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
