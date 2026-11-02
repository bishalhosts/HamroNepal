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
- Every district page includes a "Find [district] news" section with Google
  News and outlet-specific searches for Onlinekhabar, Setopati, and Kantipur.
  These open external search results; the site does not publish or host news
  stories. Curated district news and community links can also be added below.
- District pages show a smaller boundary map and a popular news-search panel
  beside the profile on desktop; on tablet and mobile, the news panel moves
  above the district details so it is easy to find.

Adding district website and Facebook links
===========================================
1. Open District/district-links.js in the project folder.
2. Find the link examples near the top of the file.
3. Add a line for the district slug, using one of these categories:
   - facebook: Facebook pages
   - websites: official websites
   - news: news websites
   - other: other useful resources
4. For example, to add links to Kathmandu:
   districtLinks.kathmandu.facebook.push({
     label: "Kathmandu Facebook page",
     url: "https://www.facebook.com/your-page",
   });
   districtLinks.kathmandu.websites.push({
     label: "Kathmandu official website",
     url: "https://example.com",
   });
5. Replace the sample labels and URLs with the real public page details.
   Repeat the line to add more links; each district can have multiple links in
   every category. Use the district's page filename without ".html" as its
   slug (for example, District/kathmandu.html uses "kathmandu").
6. Save the file and reload the district page to confirm the links appear.
   Do not add these links to the district HTML page.
