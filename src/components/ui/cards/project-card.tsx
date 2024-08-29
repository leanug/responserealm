'use client'

import Link from "next/link"

import { ArrowRightIcon } from "@heroicons/react/24/solid"

interface CardProps {
  name: string,
  description: string,
  slug: string,
}

const ProjectCard: React.FC<CardProps> = (props) => {
  const {name, description, slug} = props

  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link 
            href={`/account/user-007/${slug}`}
            className="btn"
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard