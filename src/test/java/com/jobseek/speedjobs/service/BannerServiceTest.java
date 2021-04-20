package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.file.dto.File;
import com.jobseek.speedjobs.domain.banner.Banner;
import com.jobseek.speedjobs.domain.banner.BannerRepository;
import com.jobseek.speedjobs.dto.banner.BannerResponse;
import com.jobseek.speedjobs.dto.banner.BannerResponses;
import java.util.ArrayList;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BannerServiceTest {

	@Autowired
	private BannerService bannerService;

	@Autowired
	private BannerRepository bannerRepository;

	private Long id;

	@BeforeEach
	void setUp() {
		File file = File.builder().baseName("img").extension("png").url("https://abcd.com").build();

		ArrayList<File> files = new ArrayList<File>();
		files.add(file);
		System.out.println(files);

		BannerResponses bannerResponses = bannerService.save(files);
		List<BannerResponse> res =  bannerResponses.getBanners();
		id = res.get(0).getId();
		System.out.println(id);
	}
//
//	@AfterEach
//	void After() {
//		bannerService.delete(id);
//	}

	@Test
	@DisplayName("배너 이미지 가져오기")
	void readTest() {
		BannerResponses res = bannerService.read();
//		Assertions.assertThat(re).isEqualTo(bannerResponses);
	}
}
