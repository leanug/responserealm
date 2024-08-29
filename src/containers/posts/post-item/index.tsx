// src/containers/posts/post-item/index.tsx
'use client'

interface PostItemProps {
  header: React.ReactNode
  description?: React.ReactNode
  userData?: React.ReactNode
  postStatus?: React.ReactNode
  postActions?: React.ReactNode
  postActionBtn?: React.ReactNode
  postUpdatedAt?: React.ReactNode
  postData?: React.ReactNode
}

const PostItem: React.FC<PostItemProps> = (props) => {
  const { 
    header,
    description,
    postData,
    postStatus,
    postActionBtn,
    postActions,
    postUpdatedAt
  } = props

  return (
    <div className="p-2.5 md:p-6 border-b">
      <div className="flex flex-row gap-10 justify-between items-center">
        {header}
        {postStatus}
      </div>
      {description && <div className="pb-4">{description}</div>}
      <div className="flex flex-row gap-6 justify-between items-center">
        <div className="flex flex-row gap-2 w-1/2 justify-start items-center">
          {postUpdatedAt && <div key="postUpdatedAt">{postUpdatedAt}</div>}
          {postData && <div key="userData">{postData}</div>}
        </div>
        <div className="flex flex-row justify-end w-1/2 items-center gap-2">
          {postActionBtn && <div key="postActionBtn">{postActionBtn}</div>}
          {postActions && <div key="postActions">{postActions}</div>}
        </div>
      </div>
    </div>
  )
}

export default PostItem
