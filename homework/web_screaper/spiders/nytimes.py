# -*- coding: utf-8 -*-
import scrapy


class NytimesSpider(scrapy.Spider):
    name = "nytimes"
    allowed_domains = ["newyorktimes.com"]
    start_urls = (
        'http://www.newyorktimes.com/',
    )

    def parse(self, response):
			for self in response.xpath('//div'):  
				title =sel.xpath('a/text()').extract()
				link = sel.xpath('a/@href').extract()
				desc +sel.xpath('text()').extract()
				print title, link, desc
