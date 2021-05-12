package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostQueryRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostQueryRepository postQueryRepository;
	private final PostRepository postRepository;
	private final TagService tagService;

	@Transactional
	public Long save(PostRequest postRequest, User user) {
		Post post = postRequest.toEntity();
		post.setUser(user);
		List<Tag> tags = tagService.findTagsById(postRequest.getTagIds());
		post.addTags(tags);
		return postRepository.save(post).getId();
	}

	@Transactional
	public void update(Long postId, User user, PostRequest postRequest) {
		Post post = findOne(postId);
		post.getUser().validateMe(user.getId());
		List<Tag> tags = tagService.findTagsById(postRequest.getTagIds());
		post.update(postRequest.toEntity(), tags);
	}

	@Transactional
	public void delete(Long postId, User user) {
		Post post = findOne(postId);
		if (!user.isAdmin()) {
			post.getUser().validateMe(user.getId());
		}
		postRepository.delete(post);
	}

	@Transactional
	public PostResponse findById(Long postId, User user) {
		Post post = findOne(postId);
		if (user != post.getUser()) {
			post.increaseViewCount();
		}
		return PostResponse.of(post, user);
	}

	/**
	 * 찜하기
	 */
	@Transactional
	public void savePostFavorite(Long postId, User user) {
		Post post = findOne(postId);
		post.addFavorite(user);
	}

	@Transactional
	public void deletePostFavorite(Long postId, User user) {
		Post post = findOne(postId);
		post.removeFavorite(user);
	}

	public Page<PostListResponse> findPostFavorites(final Pageable pageable, User user) {
		List<Post> posts = user.getPostFavorites();
		final int start = (int) pageable.getOffset();
		final int end = Math.min((start + pageable.getPageSize()), posts.size());
		return new PageImpl<>(posts.subList(start, end).stream()
			.map(post -> PostListResponse.of(post, user))
			.collect(Collectors.toList()), pageable, posts.size());
	}

	public Page<PostListResponse> findAll(PostSearchCondition condition, Pageable pageable,
		User user) {
		return postQueryRepository.findAll(condition, pageable)
			.map(post -> PostListResponse.of(post, user));
	}

	public Post findOne(Long postId) {
		return postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 게시글입니다."));
	}
}
