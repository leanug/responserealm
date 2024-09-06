import FeedbackPost from "@/containers/home/posts/post-item"
import { feedbackPosts } from "@/utils/feedbackposts"

const HomePostList: React.FC = () => {
  return (
    <ul className="flex flex-col w-full">
      {feedbackPosts.map((post, index) => (
        <li key={index}>
          <FeedbackPost
            title={post.title}
            status={post.status}
            description={post.description}
            timestamp={post.timestamp}
            likes={post.likes}
            commentCount={post.commentCount}
            isLiked={post.isLiked}
          />
        </li>
      ))}
    </ul>
  )
}

export default HomePostList
