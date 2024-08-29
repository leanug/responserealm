'use client'

import StatusFilterBtn from '@/containers/ui/filters/post-status-filter/status-filter-btn'
import { usePostFilterStore } from '@/store/use-post-filter-store'

function PostStatusFilter() {
  const { statusFilter, setStatusFilter } = usePostFilterStore()

  return (
    <ul className="menu menu-horizontal w-full p-0 gap-1">
      <StatusFilterBtn
        label="All"
        isActive={statusFilter === 'All'}
        onClick={() => setStatusFilter('All')}
      />
      <StatusFilterBtn
        label="Fulfilled"
        isActive={statusFilter === 'Fulfilled'}
        onClick={() => setStatusFilter('Fulfilled')}
      />
      <StatusFilterBtn
        label="Underway"
        isActive={statusFilter === 'Underway'}
        onClick={() => setStatusFilter('Underway')}
      />
    </ul>
  )
}

export default PostStatusFilter
