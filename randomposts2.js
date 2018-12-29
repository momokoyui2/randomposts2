document.getElementsByClassName("btn-random2")[0].addEventListener("click", e => {
  document.getElementsByClassName("random-posts2")[0].innerHTML = "";
  fetch(`/feeds/posts/summary?alt=json&max-results=0`).then(response => response.json()).then(data => {
    let totalPost = data.feed.openSearch$totalResults.$t;
    let nums = [],
      gen_nums = [];
    for (let x = 0; x < totalPost; x++) {
      nums.push(x + 1)
    };
    var in_array = (array, el) => {
      for (let i = 0; i < array.length; i++)
        if (array[i] == el) return true;
      return false;
    }
    var get_rand = array => {
      let rand = array[Math.floor(Math.random() * array.length)];
      if (!in_array(gen_nums, rand)) {
        gen_nums.push(rand);
        return rand;
      }
      return get_rand(array);
    }
    for (var v = 0; v < 6; v++) {
      for (var w = 1; w <= 1; w++) {
        fetch(`/feeds/posts/summary?alt=json&max-results=1&start-index=${get_rand(nums)}`).then(res => res.json()).then(json => {
          let title, href, thumb;
          for (let n = 0; n < json.feed.entry.length; n++) {
            for (let s = 0; s < json.feed.entry[n].link.length; s++) {
              if (json.feed.entry[n].link[s].rel === "alternate") {
                href = json.feed.entry[n].link[s].href;
                break;
              }
            }
            title = json.feed.entry[n].title.$t;
            if ("media$thumbnail" in json.feed.entry[n]) {
              thumb = json.feed.entry[n].media$thumbnail.url.replace("s72-c", "s260");
            } else {
              thumb = "https://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png"
            }
            document.getElementsByClassName("random-posts2")[0].innerHTML += `<div class="item"><div class="thumb"><a href="${href}"><img src="${thumb}"/></a></div><div class="content"><a href="${href}">${title}></div></div>`;
          }
        }).catch(e => console.error(e))
      }
    }
  }).catch(error => console.error(error))
  e.currentTarget.innerHTML = "Continue find more posts";
}, {
  once: false
});