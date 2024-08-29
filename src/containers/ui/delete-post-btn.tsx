import { TrashIcon } from '@heroicons/react/24/outline'

import { usePostActions } from '@/hooks/use-post-actions'

function DeletePostBtn({postId}: {postId: string}) {
  const { isDeleting, handleDelete } = usePostActions()

  return (
    <button
      onClick={() => handleDelete(postId)}
      disabled={isDeleting}
      className="btn btn-ghost"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  )
}

export default DeletePostBtn