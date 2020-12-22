class VideoPlayer {
	static Source = null;
	static FocusColor = null;
	static ProgramShow = new Array;
	static CreateLink = document ['createElement'] ('LINK');
	static CreateTitle = document ['createElement'] ('H3');
	static CreateVideo = document ['createElement'] ('VIDEO');
	static CreateSource = document ['createElement'] ('SOURCE');
	static CreateControls = document ['createElement'] ('DIV');
	static CreatePreviousButton = document ['createElement'] ('BUTTON');
	static CreateNextButton = document ['createElement'] ('BUTTON');
	static CreateProgramList = document ['createElement'] ('DIV');
	static CreateUL = document ['createElement'] ('UL');
	static Value = 0;
	
	constructor (Options) {
		if (Options && Options ['Frame'] && Options ['Source']) {
			VideoPlayer ['Source'] = Options ['Source'];
			VideoPlayer ['FocusColor'] = Options ['FocusColor'] ? Options ['FocusColor'] : 'Red';
			VideoPlayer ['Source'] ['ProgramList'] ['forEach'] ((Source, Value) => {
				if (!new RegExp ('HTTP|HTTPS', 'img') ['test'] (Source['Url'] ['toUpperCase'] ()))
				VideoPlayer ['Source'] ['ProgramList'] [Value] ['Url'] = `../Videos/${Source['Url']}`
			});
			VideoPlayer ['CreateTitle'] ['setAttribute'] ('Id', 'Title');
			VideoPlayer ['CreateVideo'] ['setAttribute'] ('Id', 'Medio');
			VideoPlayer ['CreateSource'] ['setAttribute'] ('Id', 'Source');
			VideoPlayer ['CreateControls'] ['setAttribute'] ('Id', 'Controls');
			VideoPlayer ['CreateProgramList'] ['setAttribute'] ('Id', 'ProgramList');
			VideoPlayer ['CreatePreviousButton'] ['setAttribute'] ('Id', 'Previous');
			VideoPlayer ['CreateNextButton'] ['setAttribute'] ('Id', 'Next');
			VideoPlayer ['CreateLink'] ['setAttribute'] ('Rel', 'StyleSheet');
			VideoPlayer ['CreateLink'] ['setAttribute'] ('Href', 'https://cdn.jsdelivr.net/gh/IZIMUI/VideoPlayer/VideoPlayer.CSS');
			VideoPlayer ['CreateVideo'] ['setAttribute'] ('Autoplay', true);
			VideoPlayer ['CreateVideo'] ['setAttribute'] ('Controls', true);
			VideoPlayer ['CreatePreviousButton'] ['appendChild'] (document ['createTextNode'] ('上一期'));
			VideoPlayer ['CreateNextButton'] ['appendChild'] (document ['createTextNode'] ('下一期'));
			VideoPlayer ['CreatePreviousButton'] ['addEventListener'] ('click', this ['Previous']);
			VideoPlayer ['CreateNextButton'] ['addEventListener'] ('click', this ['Next']);
			VideoPlayer ['CreateVideo'] ['appendChild'] (VideoPlayer ['CreateSource']);
			VideoPlayer ['CreateControls'] ['appendChild'] (VideoPlayer ['CreatePreviousButton']);
			VideoPlayer ['CreateControls'] ['appendChild'] (VideoPlayer ['CreateNextButton']);
			VideoPlayer ['CreateProgramList'] ['appendChild'] (VideoPlayer ['CreateUL']);
			Options ['Frame'] ['appendChild'] (VideoPlayer ['CreateTitle']);
			Options ['Frame'] ['appendChild'] (VideoPlayer ['CreateVideo']);
			Options ['Frame'] ['appendChild'] (VideoPlayer ['CreateControls']);
			Options ['Frame'] ['appendChild'] (VideoPlayer ['CreateProgramList']);
			if (! (Options ['Customize'] && Options ['Customize'] === true))
			document ['body'] ['appendChild'] (VideoPlayer ['CreateLink']);
			VideoPlayer ['LoadProgramList'] ();
			VideoPlayer ['UpdateVideoPlayerSource'] (new Object({
				"Type": "Button",
				"Data": VideoPlayer ['Source'],
				"Title": VideoPlayer ['CreateTitle'],
				"VideoPlayer": VideoPlayer ['CreateVideo'],
				"Source": VideoPlayer ['CreateSource'],
				"Value": VideoPlayer ['Value']
			}));
			let Judge = setInterval(() => {
				if (VideoPlayer ['Value'] === VideoPlayer ['Source'] ['ProgramList'] ['length'] - 1)
				clearInterval(Judge);
				if (Options ['ListPlaying'] && Options ['ListPlaying'] === true && VideoPlayer ['CreateVideo'] ['ended'])
				this ['Next'] ()
			},
			true)
		}
	};
	
	Previous () {
		if (VideoPlayer ['Value'] !== 0)
		VideoPlayer ['UpdateVideoPlayerSource'] (new Object({
			"Type": "Button",
			"Data": VideoPlayer ['Source'],
			"Title": VideoPlayer ['CreateTitle'],
			"VideoPlayer": VideoPlayer ['CreateVideo'],
			"Source": VideoPlayer ['CreateSource'],
			"Value": -- VideoPlayer ['Value']
		}));
		else
		alert('已經是頭期了');
		VideoPlayer ['UpdateShow'] ()
	};
	
	Next () {
		if (VideoPlayer ['Value'] !== VideoPlayer ['Source'] ['ProgramList'] ['length'] - 1)
		VideoPlayer ['UpdateVideoPlayerSource'] (new Object({
			"Type": "Load",
			"Data": VideoPlayer ['Source'],
			"Title": VideoPlayer ['CreateTitle'],
			"VideoPlayer": VideoPlayer ['CreateVideo'],
			"Source": VideoPlayer ['CreateSource'],
			"Value": ++ VideoPlayer ['Value']
		}));
		else
		alert('已經是尾期了');
		VideoPlayer ['UpdateShow'] ()
	};
	
	static UpdateVideoPlayerSource (Options) {
		if (Options ['Type'] === 'Load' || Options ['Type'] === 'Button') {
			Options ['Title'] ['innerHTML'] = Options ['Data'] ['ProgramList'] [Options ['Value']] ['Title'];
			Options ['Source'] ['src'] = Options ['Data'] ['ProgramList'] [Options ['Value']] ['Url']
		} else if (Options ['Type'] === 'List') {
			Options ['Title'] ['innerHTML'] = Options ['Data'] [0];
			Options ['Source'] ['src'] = Options ['Data'] [1]
		};
		Options ['VideoPlayer'] ['load'] ();
		Options ['VideoPlayer'] ['play'] ()
	};
	
	static LoadProgramList () {
		VideoPlayer ['Source'] ['ProgramList'] ['forEach'] ((Source, Value) => {
			let CreateLI = document ['createElement'] ('LI');
			VideoPlayer ['ProgramShow'] ['push'] (CreateLI);
			CreateLI ['setAttribute'] ('Id', 'Choose');
			CreateLI ['addEventListener'] ('click', () => {
				if (VideoPlayer ['Value'] !== Value) {
					VideoPlayer ['Value'] = Value;
					VideoPlayer ['UpdateVideoPlayerSource'] (new Object({
						"Type": "List",
						"Data": [Source['Title'], Source['Url']],
						"Title": VideoPlayer ['CreateTitle'],
						"VideoPlayer": VideoPlayer ['CreateVideo'],
						"Source": VideoPlayer ['CreateSource']
					}));
					VideoPlayer ['UpdateShow'] ()
				}
			});
			CreateLI ['appendChild'] (document ['createTextNode'] (Source['Title']));
			VideoPlayer ['CreateUL'] ['appendChild'] (CreateLI)
		});
		VideoPlayer ['ProgramShow'] [0] ['style'] ['background'] = VideoPlayer ['FocusColor']
	};
	
	static UpdateShow () {
		VideoPlayer ['ProgramShow'] ['forEach'] (Element => {
			Element ['style'] ['background'] = 'none'
		});
		VideoPlayer ['ProgramShow'] [VideoPlayer ['Value']] ['style'] ['background'] = VideoPlayer ['FocusColor']
	}
}
