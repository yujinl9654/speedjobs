package com.jobseek.speedjobs.domain.recruit;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.common.exception.BadRequestException;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "recruits")
public class Recruit extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_id")
	private Long id;

	private String title;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	@Enumerated(EnumType.STRING)
	private Status status;

	private String thumbnail;

	private Integer experience;

	private int viewCount;

	private int favoriteCount;

	@Embedded
	private RecruitDetail recruitDetail;

	@OneToMany(mappedBy = "recruit", cascade = ALL, orphanRemoval = true)
	private final List<Apply> applies = new ArrayList<>();

	@OneToMany(cascade = ALL, orphanRemoval = true)
	private final List<Message> messages = new ArrayList<>();

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "company_id")
	private Company company;

	@ManyToMany
	@JoinTable(name = "recruit_tags",
		joinColumns = @JoinColumn(name = "recruit_id"),
		inverseJoinColumns = @JoinColumn(name = "tag_id")
	)
	private final List<Tag> tags = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "recruit_favorites",
		joinColumns = @JoinColumn(name = "recruit_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private final List<User> favorites = new ArrayList<>();

	@Builder
	public Recruit(Long id, String title, LocalDateTime openDate, LocalDateTime closeDate,
		Status status, String thumbnail, Integer experience,
		RecruitDetail recruitDetail, Company company) {
		this.id = id;
		this.title = title;
		this.openDate = openDate;
		this.closeDate = closeDate;
		this.status = status;
		this.thumbnail = thumbnail;
		this.experience = experience;
		this.recruitDetail = recruitDetail;
		this.company = company;
	}

	public void increaseViewCount() {
		viewCount += 1;
	}

	public void update(Recruit recruit, List<Tag> tags) {
		removeTags();
		addTags(tags);
		this.title = recruit.getTitle();
		this.openDate = recruit.getOpenDate();
		this.closeDate = recruit.getCloseDate();
		this.thumbnail = recruit.getThumbnail();
		this.recruitDetail = recruit.getRecruitDetail();
		setStatus();
	}

	public void changeStatus(Status status) {
		this.status = status;
	}

	public void addTags(List<Tag> tags) {
		for (Tag tag : tags) {
			this.tags.add(tag);
			tag.getRecruits().add(this);
		}
	}

	public void removeTags() {
		tags.forEach(tag -> tag.getRecruits().remove(this));
		tags.clear();
	}

	public void addFavorite(User user) {
		if (favoriteOf(user)) {
			throw new DuplicatedException("이미 찜한 공고입니다.");
		}
		favorites.add(user);
		user.getRecruitFavorites().add(this);
		favoriteCount += 1;
	}

	public void removeFavorite(User user) {
		if (!favoriteOf(user)) {
			throw new NotFoundException("찜 목록에 존재하지 않는 공고입니다.");
		}
		favorites.remove(user);
		user.getRecruitFavorites().remove(this);
		favoriteCount -= 1;
	}

	public boolean favoriteOf(User user) {
		if (user == null) {
			return false;
		}
		return user.getRecruitFavorites().contains(this);
	}

	public boolean isApplied(Long userId) {
		return applies.stream().anyMatch(apply -> apply.getMemberId().equals(userId));
	}

	public void setStatus() {
		LocalDateTime now = LocalDateTime.now();

		if (closeDate.getYear() == 9999) {
			status = Status.REGULAR;
		} else if (openDate.isAfter(now)) {
			status = Status.DRAFT;
		} else if (openDate.isBefore(now) && closeDate.isAfter(now)) {
			status = Status.PROCESS;
		} else {
			throw new BadRequestException("공고 일자가 올바르지 않습니다.");
		}
	}
}
