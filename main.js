
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "TM_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
var newArrayRandom = []

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
   config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
        name: "Save your tear",
        singer: "The Weeknd",
        path: "./assets/music/The Weeknd  Save Your Tears Lyrics.mp3",
          image: "./assets/img/theweeknd.jpg"
      },
      {
        name: "Waiting for you",
        singer: "Mono",
        path: "./assets/music/MONO  Waiting For You Album 22  Track No10.mp3",
        image: "./assets/img/mono.jpg"
    },
    {
        name: "Gone",
        singer: "ROSÉ",
        path: "./assets/music/ROSÉ  Gone MV.mp3",
        image:"./assets/img/rose.jpg"
    },
    {
        name: "Me and My Broken Heart",
        singer: "Rixton",
        path: "./assets/music/Rixton  Me and My Broken Heart Official Video.mp3",
        image:"./assets/img/rixton.jpg"
    },
    {
      name: "Teeth",
      singer: "5 Seconds of Summer",
      path: "./assets/music/5 Seconds of Summer  Teeth Official Video.mp3",
      image: "./assets/img/5SecondsofSummer.jpg"
    },
    {
      name: "Somebody That I Used To Know",
      singer: "Gotye feat Kimbra",
      path: "./assets/music/Gotye feat Kimbra  Somebody That I Used To Know.mp3",
      image:"./assets/img/GotyefeatKimbra.jpg"
    },
    {
      name: "Sold Out",
      singer: "Hawk Nelson",
      path: "./assets/music/Hawk Nelson  Sold Out.mp3",
      image:"./assets/img/Hawk Nelson.jpg"
     },
    {
      name: "Take Me To Church",
      singer: "Hozier",
      path: "./assets/music/Hozier  Take Me To Church.mp3",
      image:"./assets/img/Hozier.jpg"
    },
    {
      name: "Im not the only one  speed up",
      singer: "Sam Smith",
      path: "./assets/music/Im not the only one  speed up.mp3",
      image:"./assets/img/samsmith.jpg" 
    },
    {
      name: "Bones",
      singer: "Imagine Dragon",
      path: "./assets/music/Imagine Dragons  Bones .mp3",
      image:"./assets/img/imaginedragons.jpg"
    },
    {
      name: "INDUSTRY BABY",
      singer: "Lil Nas X Jack Harlow",
      path: "./assets/music/Lil Nas X Jack Harlow  INDUSTRY BABY.mp3",
      image:"./assets/img/Lil Nas X Jack Harlow.jpg"
    },
    {
      name: "Merry Go Round of Life  Howls Moving Castle",
      singer: "Oh辛辛君",
      path: "./assets/music/Merry Go Round of Life  Howls Moving Castle guitar cover by Oh辛辛君.mp3",
      image:"./assets/img/oh.jpg"
    },
    {
      name: "Until I Found You",
      singer: "Stephen Sanchez Em Beihold",
      path: "./assets/music/Stephen Sanchez Em Beihold  Until I Found You.mp3",
      image:"./assets/img/Stephen Sanchez Em Beihold.jpg"
    },
    {
      name: "Blinding Lights",
      singer: "The Weeknd",
      path: "./assets/music/The Weeknd  Blinding Lights Official Audio.mp3",
      image:"./assets/img/theweeknd.jpg"
    },
    {
      name: "Die For You",
      singer: "The Weeknd",
      path: "./assets/music/The Weeknd  Die For You Official Audio.mp3",
      image:"./assets/img/theweeknd.jpg"
    },
    {
      name: "Out of Time",
      singer: "The Weeknd",
      path: "./assets/music/The Weeknd  Out of Time Official Video.mp3",
      image:"./assets/img/theweeknd.jpg"
    },
    {
      name: "AI BIET",
      singer: "WEAN",
      path: "./assets/music/WEAN  AI BIET.mp3",
      image:"./assets/img/wean.jpg"
    },
    {
      name: "Your Man",
      singer: "Josh Turner",
      path: "./assets/music/Your Man  Josh Turner .mp3",
      image:"./assets/img/Josh Turner.jpg"
    }
 
 
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song,index) => {
      return `
                        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join('');
  },
  defineProperties: function(){
    Object.defineProperty(this, 'currentSong', {
      get: function(){
          return this.songs[this.currentIndex];
      }
    })
  },

  handleEvent: function(){
    const _this = this;
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate([
        { transform: 'rotate(360deg)' },

    ], {
      duration: 10000,
      iterations: Infinity,
    })
    
    cdThumbAnimate.pause()
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" :0 
      cd.style.opacity = newCdWidth / cdWidth

    };
    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    audio.onplay = function() {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    audio.onpause = function() {
      _this.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }
    
    audio.ontimeupdate = function() {
      if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime / audio.duration *100)      
        progress.value = progressPercent
      }
    }

    progress.onchange = function(e) {
        const seekTime = Math.floor((audio.duration /100) * progress.value )
        audio.currentTime = seekTime

    }

    nextBtn.onclick = function(e) {
      if(_this.isRandom){
        _this.playRandomSong()
      }else{
      _this.nextSong()
    }
      audio.play()
      _this.render()
      _this.scollToActiveSong()

    }
    prevBtn.onclick = function() {
      _this.prevSong()
      audio.play() 
      _this.render()
      _this.scollToActiveSong()
    }

    randomBtn.onclick = function() {
      newArrayRandom=[];
      _this.isRandom = !_this.isRandom
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle('active', _this.isRandom)

    }

    repeatBtn.onclick = function() {
      _this.isRepeat =!_this.isRepeat
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle('active', _this.isRepeat)
    }

    audio.onended = function() {
      if (_this.isRepeat) {
        audio.play()
      }else{  
        nextBtn.click()
      }
    }

    playlist.onclick = function(e) {
           const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    }

  },
  scollToActiveSong: function() {
    var index = Number(document.querySelector('div.song.active').getAttribute('data-index'))
    if(index>5){
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      },300)
    }else{
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    },300)
  }},

  loadCurrentSong: function(){
      heading.textContent =  this.currentSong.name
      cdThumb.style.backgroundImage = `url('${this.currentSong.image} ')`
      audio.src = this.currentSong.path;
  },
  play: function(){
    this.isPlaying = true
  },
  loadConfig: function(){
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function(){
    this.currentIndex++
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function(){
    this.currentIndex--
    if(this.currentIndex < 0 ){
      this.currentIndex = this.songs.length -1
    }
    this.loadCurrentSong()
  },
  playRandomSong: function(){
      let newIndex
      let notIncludesArray
      if(Number(newArrayRandom.length)===this.songs.length){
        newArrayRandom = []
      }
   do{  
     newIndex = Math.floor(Math.random() * this.songs.length)
     notIncludesArray = !(newArrayRandom.includes(newIndex)) 
      console.log(notIncludesArray) 
      if(notIncludesArray){
      newArrayRandom.push(newIndex)
      }
   }while ((newIndex === this.currentIndex) || !notIncludesArray) ;

    this.currentIndex = newIndex;
    this.loadCurrentSong();
    console.log(newIndex)    
    console.log(newArrayRandom)

  },
  checkSongPlaying: function(){


  },
  start: function(){
    this.loadConfig();
    this.defineProperties()
    this.handleEvent()
    this.loadCurrentSong()
    this.render()
    // hien thi trang thai ban dau cuabtn repeat & random
    randomBtn.classList.toggle('active', this.isRandom)
    repeatBtn.classList.toggle('active', this.isRepeat)
  }
};

app.start();