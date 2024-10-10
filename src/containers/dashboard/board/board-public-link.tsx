'use client'

import React, { useRef } from 'react'
import Link from "next/link"

import { 
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline"
import { LoadingIndicator } from '@/components'
import { useFetchBoard } from '@/hooks'

const PublicLink = () => {
  const {
    data: board, 
    isLoading, 
    error
  } = useFetchBoard()

  const inputRef = useRef<HTMLInputElement>(null)
  const link = process.env.NEXT_PUBLIC_BASE_URL + '/b/' + board?.slug

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Error copying text: ', err);
        });
    }
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {error && <span>Error: Board not found</span>}
      {board && 
        <label className="form-control w-full">
          <div className="label">
            <div className="flex flex-row items-center gap-2">
              <div 
                className="tooltip tooltip-right"
                data-tip="Use the following link for the href so your users can find your suggestions page"
              >
                <InformationCircleIcon className="w-5 h-5 text-blue-300" />
              </div>
              <span className="label-text">Public link</span>
            </div>
          </div>
          <div className="flex flex-row gap-2.5">
            <input
              ref={inputRef}
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full" 
              value={link}
              readOnly
            />
            <div 
              className="tooltip tooltip-top" 
              data-tip="Copy link"
            >
              <button 
                className="btn btn-neutral"
                onClick={handleCopy}
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
              </button>
            </div>
            <div 
              className="tooltip tooltip-top" 
              data-tip="Open link"
            >
              <Link 
                href={link}
                className="btn btn-neutral"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </label>
      }
    </>
  )
}

export default PublicLink