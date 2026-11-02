Hamro Nepal — Calendar, Atlas & News
====================================

Nepal SVG maps
==============
Open maps.html to browse all national, province, and district maps.
nepal-provinces.svg   7 provinces (numbered)
nepal-districts.svg   all 77 districts, coloured by province, province borders in dark blue
provinces/            one SVG per province, with its districts and district names
districts/             one SVG per district (77 files)

Every shape has an id and data-name (and data-province for districts), so they
are easy to style or make clickable. Colours are plain fill attributes: edit
them in any text editor, Inkscape, Illustrator or Figma.

Notes
- District names follow the site's list (e.g. Nawalpur, Nawalparasi West,
  Rukum East, Rukum West).
- Small districts such as Bhaktapur and Lalitpur have no printed label on the
  province maps; their name is in the shape's id and <title>.
- Boundaries come from the MIT-licensed "nepal-geojson" data, simplified for
  web use. Fine for display; not for surveying or legal boundary use.
- District pages display their matching districts/<slug>.svg boundary map.
- Province pages display their matching provinces/province-<number>-<slug>.svg
  map. The old assets/provinces silhouettes were removed after these maps
  replaced them.
- District, province, and map-library pages use the same responsive visual
  style and 1440px maximum content width as the landing page on mobile,
  tablet, and desktop.
- Every page loads site-shell.js for the Nepal-time header clock and shared
  footer. The clock stays visible with the sticky header.
- Link-management instructions are kept in this text file and are not shown
  on public district pages.
- The "Popular news searches" section on each district page shows only news
  links added by the site owner for that district. It does not generate
  Google News or Onlinekhabar, Setopati, or Kantipur searches automatically.
- District pages show a smaller boundary map and a popular news-search panel
  beside the profile on desktop; on tablet and mobile, the news panel moves
  above the district details so it is easy to find.

Adding district news and Facebook links
=======================================
1. Open District/district-links.js in the project folder.
2. Find the link examples near the top of the file.
3. Add links to the district's news list. Links on facebook.com (including
   subdomains) are automatically shown under Facebook pages; all other
   websites, including .com domains, are shown under News websites.
4. For example, to add a news site and Facebook page for Kathmandu:
   districtLinks.kathmandu.news.push({
     label: "Kathmandu News",
     url: "https://example.com/kathmandu-news",
   });
   districtLinks.kathmandu.news.push({
     label: "Kathmandu Facebook page",
     url: "https://www.facebook.com/your-page",
   });
5. Replace the sample labels and URLs with the real public page details.
   Repeat the line to add more links. Use the district's page filename
   without ".html" as its slug (for example,
   District/kathmandu.html uses "kathmandu").
6. Save the file and reload the district page to confirm the links appear.
   Do not add these links to the district HTML page.
