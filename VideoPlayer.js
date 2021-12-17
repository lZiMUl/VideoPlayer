class VideoPlayer {
  static link = document.createElement('link');
  static title = document.createElement('h3');
  static video = document.createElement('video');
  static source = document.createElement('source');
  static div = document.createElement('div');
  static ul = document.createElement('ul');
  static index = 0;
  static cache = [];
  
  constructor(root, config) {
    if (root) {
      VideoPlayer.link.setAttribute('rel', 'stylesheet');
      VideoPlayer.link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/lZiMUl/VideoPlayer@main/VideoPlayer.css');
      VideoPlayer.title.setAttribute('class', 'title');
      VideoPlayer.video.setAttribute('class', 'video');
      VideoPlayer.video.setAttribute('autoplay', true);
      VideoPlayer.video.setAttribute('controls', true);
      VideoPlayer.source.setAttribute('class', 'source');
      VideoPlayer.div.setAttribute('class', 'programList');
      
      VideoPlayer.title.appendChild(document.createTextNode(config.title));
      VideoPlayer.video.appendChild(VideoPlayer.source);
      
      VideoPlayer.loadProgramList(config);
      
      root.appendChild(VideoPlayer.title);
      root.appendChild(VideoPlayer.video);
      root.appendChild(VideoPlayer.div);
      
      document.head.appendChild(VideoPlayer.link);
    } else {
      throw new Error('錯誤參數');
    };
  };
  
  static playVideo(source, index, chooseColor) {
    document.getElementsByName('program').forEach(item => item.setAttribute('style', null))
    document.getElementsByName('program')[index].setAttribute('style', `background: ${chooseColor}`)
    VideoPlayer.index = index;
    VideoPlayer.source.setAttribute('src', source[index].url);
    VideoPlayer.video.load();
    VideoPlayer.video.play();
  };
  
  static loadProgramList({source, chooseColor = 'green', autoNext = false}) {
    source.forEach(({title, url}, index) => {
      const li = document.createElement('li');
      li.setAttribute('name', 'program');
      li.setAttribute('class', 'choose');
      if (index === 0) {
        li.setAttribute('style', `background: ${chooseColor}`);
        if (autoNext) {
          VideoPlayer.autoNext(source, index, chooseColor);
        }
      };
      li.addEventListener('click', () => {
        if (VideoPlayer.index !== index) {
          VideoPlayer.playVideo(source, index, chooseColor);
        };
      });
      li.innerText = title;
      VideoPlayer.ul.appendChild(li);
    });
    VideoPlayer.sourceSize = source.length;
    VideoPlayer.source.setAttribute('src', source[0].url);
    VideoPlayer.div.appendChild(VideoPlayer.ul);
  };
  
  static autoNext(source, index, chooseColor) {
    const heartbeat = setInterval(() => {
      if (index !== source.length - 1) {
        if (VideoPlayer.video.ended) {
          VideoPlayer.playVideo(source, ++ index, chooseColor);
        };
      } else {
        clearInterval(heartbeat);
      };
    }, 1000);
  };
};
