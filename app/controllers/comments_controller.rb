class CommentsController < ApplicationController

	before_action :get_post
	respond_to :json

	def create
		comment = @post.comments.create(comment_params)
		respond_with @post, comment
	end

	def upvote
		comment = @post.comments.find(params[:id])
		comment.increment!(:upvotes)

		respond_with @post, comment
	end

	private

	def comment_params
		params.require(:comment).permit(:body)
	end

	def get_post
		@post = Post.find(params[:post_id])
	end
end
