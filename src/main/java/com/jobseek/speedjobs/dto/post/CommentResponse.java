package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentResponse {

	private Long id;
	private Long authorId;
	private String author;
	private String picture;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;

	public static CommentResponse of(Comment comment) {
		User author = comment.getUser();
		return CommentResponse.builder()
			.id(comment.getId())
			.authorId(author.getId())
			.author(author.getNickname())
			.picture(author.getPicture())
			.content(comment.getContent())
			.createdDate(comment.getCreatedDate())
			.modifiedDate(comment.getModifiedDate())
			.build();
	}

}
