function y(h, g, b) {
    var c = g || 0, d = 0;
    "string" == typeof h ? (d = b || h.length, this.a = function (a) {
        return h.charCodeAt(a + c) & 255
    }) : "unknown" == typeof h && (d = b || IEBinary_getLength(h), this.a = function (a) {
        return IEBinary_getByteAt(h, a + c)
    });
    this.l = function (a, f) {
        for (var v = Array(f), b = 0; b < f; b++)v[b] = this.a(a + b);
        return v
    };
    this.h = function () {
        return d
    };
    this.d = function (a, f) {
        return 0 != (this.a(a) & 1 << f)
    };
    this.w = function (a) {
        a = (this.a(a + 1) << 8) + this.a(a);
        0 > a && (a += 65536);
        return a
    };
    this.i = function (a) {
        var f = this.a(a), b = this.a(a + 1), d =
            this.a(a + 2);
        a = this.a(a + 3);
        f = (((f << 8) + b << 8) + d << 8) + a;
        0 > f && (f += 4294967296);
        return f
    };
    this.o = function (a) {
        var f = this.a(a), b = this.a(a + 1);
        a = this.a(a + 2);
        f = ((f << 8) + b << 8) + a;
        0 > f && (f += 16777216);
        return f
    };
    this.c = function (a, f) {
        for (var b = [], d = a, e = 0; d < a + f; d++, e++)b[e] = String.fromCharCode(this.a(d));
        return b.join("")
    };
    this.e = function (a, b, d) {
        a = this.l(a, b);
        switch (d.toLowerCase()) {
            case "utf-16":
            case "utf-16le":
            case "utf-16be":
                b = d;
                var l, e = 0, c = 1;
                d = 0;
                l = Math.min(l || a.length, a.length);
                254 == a[0] && 255 == a[1] ? (b = !0, e = 2) : 255 ==
                    a[0] && 254 == a[1] && (b = !1, e = 2);
                b && (c = 0, d = 1);
                b = [];
                for (var m = 0; e < l; m++) {
                    var g = a[e + c], k = (g << 8) + a[e + d], e = e + 2;
                    if (0 == k)break; else 216 > g || 224 <= g ? b[m] = String.fromCharCode(k) : (g = (a[e + c] << 8) + a[e + d], e += 2, b[m] = String.fromCharCode(k, g))
                }
                a = new String(b.join(""));
                a.g = e;
                break;
            case "utf-8":
                l = 0;
                e = Math.min(e || a.length, a.length);
                239 == a[0] && 187 == a[1] && 191 == a[2] && (l = 3);
                c = [];
                for (d = 0; l < e && (b = a[l++], 0 != b); d++)128 > b ? c[d] = String.fromCharCode(b) : 194 <= b && 224 > b ? (m = a[l++], c[d] = String.fromCharCode(((b & 31) << 6) + (m & 63))) : 224 <= b && 240 >
                    b ? (m = a[l++], k = a[l++], c[d] = String.fromCharCode(((b & 255) << 12) + ((m & 63) << 6) + (k & 63))) : 240 <= b && 245 > b && (m = a[l++], k = a[l++], g = a[l++], b = ((b & 7) << 18) + ((m & 63) << 12) + ((k & 63) << 6) + (g & 63) - 65536, c[d] = String.fromCharCode((b >> 10) + 55296, (b & 1023) + 56320));
                a = new String(c.join(""));
                a.g = l;
                break;
            default:
                e = [];
                c = c || a.length;
                for (l = 0; l < c;) {
                    d = a[l++];
                    if (0 == d)break;
                    e[l - 1] = String.fromCharCode(d)
                }
                a = new String(e.join(""));
                a.g = l
        }
        return a
    };
    this.f = function (a, b) {
        b()
    }
}
var B = document.createElement("script");
B.type = "text/vbscript";
B.textContent = "Function IEBinary_getByteAt(strBinary, iOffset)\r\n\tIEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n\tIEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n";
document.getElementsByTagName("head")[0].appendChild(B);
function C(h, g, b) {
    function c(a, b, e, c, f, g) {
        var k = d();
        k ? ("undefined" === typeof g && (g = !0), b && ("undefined" != typeof k.onload ? (k.onload = function () {
            "200" == k.status || "206" == k.status ? (k.fileSize = f || k.getResponseHeader("Content-Length"), b(k)) : e && e({error: "xhr", xhr: k});
            k = null
        }, e && (k.onerror = function () {
            e({error: "xhr", xhr: k});
            k = null
        })) : k.onreadystatechange = function () {
            4 == k.readyState && ("200" == k.status || "206" == k.status ? (k.fileSize = f || k.getResponseHeader("Content-Length"), b(k)) : e && e({error: "xhr", xhr: k}), k = null)
        }),
            k.open("GET", a, g), k.overrideMimeType && k.overrideMimeType("text/plain; charset=x-user-defined"), c && k.setRequestHeader("Range", "bytes=" + c[0] + "-" + c[1]), k.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT"), k.send(null)) : e && e({error: "Unable to create XHR object"})
    }

    function d() {
        var a = null;
        window.XMLHttpRequest ? a = new XMLHttpRequest : window.ActiveXObject && (a = new ActiveXObject("Microsoft.XMLHTTP"));
        return a
    }

    function a(a, b, e) {
        var c = d();
        c ? (b && ("undefined" != typeof c.onload ? (c.onload = function () {
            "200" ==
            c.status || "206" == c.status ? b(this) : e && e({error: "xhr", xhr: c});
            c = null
        }, e && (c.onerror = function () {
            e({error: "xhr", xhr: c});
            c = null
        })) : c.onreadystatechange = function () {
            4 == c.readyState && ("200" == c.status || "206" == c.status ? b(this) : e && e({error: "xhr", xhr: c}), c = null)
        }), c.open("HEAD", a, !0), c.send(null)) : e && e({error: "Unable to create XHR object"})
    }

    function f(a, d) {
        var e, f;

        function g(a) {
            var b = ~~(a[0] / e) - f;
            a = ~~(a[1] / e) + 1 + f;
            0 > b && (b = 0);
            a >= blockTotal && (a = blockTotal - 1);
            return[b, a]
        }

        function h(f, g) {
            for (; n[f[0]];)if (f[0]++, f[0] >
                f[1]) {
                g && g();
                return
            }
            for (; n[f[1]];)if (f[1]--, f[0] > f[1]) {
                g && g();
                return
            }
            var m = [f[0] * e, (f[1] + 1) * e - 1];
            c(a, function (a) {
                parseInt(a.getResponseHeader("Content-Length"), 10) == d && (f[0] = 0, f[1] = blockTotal - 1, m[0] = 0, m[1] = d - 1);
                a = {data: a.N || a.responseText, offset: m[0]};
                for (var b = f[0]; b <= f[1]; b++)n[b] = a;
                g && g()
            }, b, m, k, !!g)
        }

        var k, r = new y("", 0, d), n = [];
        e = e || 2048;
        f = "undefined" === typeof f ? 0 : f;
        blockTotal = ~~((d - 1) / e) + 1;
        for (var q in r)r.hasOwnProperty(q) && "function" === typeof r[q] && (this[q] = r[q]);
        this.a = function (a) {
            var b;
            h(g([a,
                a]));
            b = n[~~(a / e)];
            if ("string" == typeof b.data)return b.data.charCodeAt(a - b.offset) & 255;
            if ("unknown" == typeof b.data)return IEBinary_getByteAt(b.data, a - b.offset)
        };
        this.f = function (a, b) {
            h(g(a), b)
        }
    }

    (function () {
        a(h, function (a) {
            a = parseInt(a.getResponseHeader("Content-Length"), 10) || -1;
            g(new f(h, a))
        }, b)
    })()
};
(function (h) {
    h.FileAPIReader = function (g, b) {
        return function (c, d) {
            var a = b || new FileReader;
            a.onload = function (a) {
                d(new y(a.target.result))
            };
            a.readAsBinaryString(g)
        }
    }
})(this);
(function (h) {
    var g = h.p = {}, b = {}, c = [0, 7];
    g.t = function (d) {
        delete b[d]
    };
    g.s = function () {
        b = {}
    };
    g.B = function (d, a, f) {
        f = f || {};
        (f.dataReader || C)(d, function (g) {
            g.f(c, function () {
                var c = "ftypM4A" == g.c(4, 7) ? ID4 : "ID3" == g.c(0, 3) ? ID3v2 : ID3v1;
                c.m(g, function () {
                    var e = f.tags, h = c.n(g, e), e = b[d] || {}, m;
                    for (m in h)h.hasOwnProperty(m) && (e[m] = h[m]);
                    b[d] = e;
                    a && a()
                })
            })
        }, f.onError)
    };
    g.v = function (d) {
        if (!b[d])return null;
        var a = {}, c;
        for (c in b[d])b[d].hasOwnProperty(c) && (a[c] = b[d][c]);
        return a
    };
    g.A = function (d, a) {
        return b[d] ? b[d][a] :
            null
    };
    h.ID3 = h.p;
    g.loadTags = g.B;
    g.getAllTags = g.v;
    g.getTag = g.A;
    g.clearTags = g.t;
    g.clearAll = g.s
})(this);
(function (h) {
    var g = h.q = {}, b = "Blues;Classic Rock;Country;Dance;Disco;Funk;Grunge;Hip-Hop;Jazz;Metal;New Age;Oldies;Other;Pop;R&B;Rap;Reggae;Rock;Techno;Industrial;Alternative;Ska;Death Metal;Pranks;Soundtrack;Euro-Techno;Ambient;Trip-Hop;Vocal;Jazz+Funk;Fusion;Trance;Classical;Instrumental;Acid;House;Game;Sound Clip;Gospel;Noise;AlternRock;Bass;Soul;Punk;Space;Meditative;Instrumental Pop;Instrumental Rock;Ethnic;Gothic;Darkwave;Techno-Industrial;Electronic;Pop-Folk;Eurodance;Dream;Southern Rock;Comedy;Cult;Gangsta;Top 40;Christian Rap;Pop/Funk;Jungle;Native American;Cabaret;New Wave;Psychadelic;Rave;Showtunes;Trailer;Lo-Fi;Tribal;Acid Punk;Acid Jazz;Polka;Retro;Musical;Rock & Roll;Hard Rock;Folk;Folk-Rock;National Folk;Swing;Fast Fusion;Bebob;Latin;Revival;Celtic;Bluegrass;Avantgarde;Gothic Rock;Progressive Rock;Psychedelic Rock;Symphonic Rock;Slow Rock;Big Band;Chorus;Easy Listening;Acoustic;Humour;Speech;Chanson;Opera;Chamber Music;Sonata;Symphony;Booty Bass;Primus;Porn Groove;Satire;Slow Jam;Club;Tango;Samba;Folklore;Ballad;Power Ballad;Rhythmic Soul;Freestyle;Duet;Punk Rock;Drum Solo;Acapella;Euro-House;Dance Hall".split(";");
    g.m = function (b, d) {
        var a = b.h();
        b.f([a - 128 - 1, a], d)
    };
    g.n = function (c) {
        var d = c.h() - 128;
        if ("TAG" == c.c(d, 3)) {
            var a = c.c(d + 3, 30).replace(/\0/g, ""), f = c.c(d + 33, 30).replace(/\0/g, ""), g = c.c(d + 63, 30).replace(/\0/g, ""), l = c.c(d + 93, 4).replace(/\0/g, "");
            if (0 == c.a(d + 97 + 28))var e = c.c(d + 97, 28).replace(/\0/g, ""), h = c.a(d + 97 + 29); else e = "", h = 0;
            c = c.a(d + 97 + 30);
            return{version: "1.1", title: a, artist: f, album: g, year: l, comment: e, track: h, genre: 255 > c ? b[c] : ""}
        }
        return{}
    };
    h.ID3v1 = h.q
})(this);
(function (h) {
    function g(a, b) {
        var d = b.a(a), c = b.a(a + 1), e = b.a(a + 2);
        return b.a(a + 3) & 127 | (e & 127) << 7 | (c & 127) << 14 | (d & 127) << 21
    }

    var b = h.D = {};
    b.b = {};
    b.frames = {BUF: "Recommended buffer size", CNT: "Play counter", COM: "Comments", CRA: "Audio encryption", CRM: "Encrypted meta frame", ETC: "Event timing codes", EQU: "Equalization", GEO: "General encapsulated object", IPL: "Involved people list", LNK: "Linked information", MCI: "Music CD Identifier", MLL: "MPEG location lookup table", PIC: "Attached picture", POP: "Popularimeter", REV: "Reverb",
        RVA: "Relative volume adjustment", SLT: "Synchronized lyric/text", STC: "Synced tempo codes", TAL: "Album/Movie/Show title", TBP: "BPM (Beats Per Minute)", TCM: "Composer", TCO: "Content type", TCR: "Copyright message", TDA: "Date", TDY: "Playlist delay", TEN: "Encoded by", TFT: "File type", TIM: "Time", TKE: "Initial key", TLA: "Language(s)", TLE: "Length", TMT: "Media type", TOA: "Original artist(s)/performer(s)", TOF: "Original filename", TOL: "Original Lyricist(s)/text writer(s)", TOR: "Original release year", TOT: "Original album/Movie/Show title",
        TP1: "Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group", TP2: "Band/Orchestra/Accompaniment", TP3: "Conductor/Performer refinement", TP4: "Interpreted, remixed, or otherwise modified by", TPA: "Part of a set", TPB: "Publisher", TRC: "ISRC (International Standard Recording Code)", TRD: "Recording dates", TRK: "Track number/Position in set", TSI: "Size", TSS: "Software/hardware and settings used for encoding", TT1: "Content group description", TT2: "Title/Songname/Content description", TT3: "Subtitle/Description refinement",
        TXT: "Lyricist/text writer", TXX: "User defined text information frame", TYE: "Year", UFI: "Unique file identifier", ULT: "Unsychronized lyric/text transcription", WAF: "Official audio file webpage", WAR: "Official artist/performer webpage", WAS: "Official audio source webpage", WCM: "Commercial information", WCP: "Copyright/Legal information", WPB: "Publishers official webpage", WXX: "User defined URL link frame", AENC: "Audio encryption", APIC: "Attached picture", COMM: "Comments", COMR: "Commercial frame", ENCR: "Encryption method registration",
        EQUA: "Equalization", ETCO: "Event timing codes", GEOB: "General encapsulated object", GRID: "Group identification registration", IPLS: "Involved people list", LINK: "Linked information", MCDI: "Music CD identifier", MLLT: "MPEG location lookup table", OWNE: "Ownership frame", PRIV: "Private frame", PCNT: "Play counter", POPM: "Popularimeter", POSS: "Position synchronisation frame", RBUF: "Recommended buffer size", RVAD: "Relative volume adjustment", RVRB: "Reverb", SYLT: "Synchronized lyric/text", SYTC: "Synchronized tempo codes",
        TALB: "Album/Movie/Show title", TBPM: "BPM (beats per minute)", TCOM: "Composer", TCON: "Content type", TCOP: "Copyright message", TDAT: "Date", TDLY: "Playlist delay", TENC: "Encoded by", TEXT: "Lyricist/Text writer", TFLT: "File type", TIME: "Time", TIT1: "Content group description", TIT2: "Title/songname/content description", TIT3: "Subtitle/Description refinement", TKEY: "Initial key", TLAN: "Language(s)", TLEN: "Length", TMED: "Media type", TOAL: "Original album/movie/show title", TOFN: "Original filename", TOLY: "Original lyricist(s)/text writer(s)",
        TOPE: "Original artist(s)/performer(s)", TORY: "Original release year", TOWN: "File owner/licensee", TPE1: "Lead performer(s)/Soloist(s)", TPE2: "Band/orchestra/accompaniment", TPE3: "Conductor/performer refinement", TPE4: "Interpreted, remixed, or otherwise modified by", TPOS: "Part of a set", TPUB: "Publisher", TRCK: "Track number/Position in set", TRDA: "Recording dates", TRSN: "Internet radio station name", TRSO: "Internet radio station owner", TSIZ: "Size", TSRC: "ISRC (international standard recording code)", TSSE: "Software/Hardware and settings used for encoding",
        TYER: "Year", TXXX: "User defined text information frame", UFID: "Unique file identifier", USER: "Terms of use", USLT: "Unsychronized lyric/text transcription", WCOM: "Commercial information", WCOP: "Copyright/Legal information", WOAF: "Official audio file webpage", WOAR: "Official artist/performer webpage", WOAS: "Official audio source webpage", WORS: "Official internet radio station homepage", WPAY: "Payment", WPUB: "Publishers official webpage", WXXX: "User defined URL link frame"};
    var c = {title: ["TIT2", "TT2"], artist: ["TPE1",
        "TP1"], album: ["TALB", "TAL"], year: ["TYER", "TYE"], comment: ["COMM", "COM"], track: ["TRCK", "TRK"], genre: ["TCON", "TCO"], picture: ["APIC", "PIC"], lyrics: ["USLT", "ULT"]}, d = ["title", "artist", "album", "track"];
    b.m = function (a, b) {
        a.f([0, g(6, a)], b)
    };
    b.n = function (a, f) {
        var h = 0, l = a.a(h + 3);
        if (4 < l)return{version: ">2.4"};
        var e = a.a(h + 4), t = a.d(h + 5, 7), m = a.d(h + 5, 6), u = a.d(h + 5, 5), k = g(h + 6, a), h = h + 10;
        if (m)var r = a.i(h), h = h + (r + 4);
        var l = {version: "2." + l + "." + e, major: l, revision: e, flags: {unsynchronisation: t, extended_header: m, experimental_indicator: u},
            size: k}, n;
        if (t)n = {}; else {
            for (var k = k - 10, t = a, e = f, m = {}, u = l.major, r = [], q = 0, p; p = (e || d)[q]; q++)r = r.concat(c[p] || [p]);
            for (e = r; h < k;) {
                r = null;
                q = t;
                p = h;
                var x = null;
                switch (u) {
                    case 2:
                        n = q.c(p, 3);
                        var s = q.o(p + 3), w = 6;
                        break;
                    case 3:
                        n = q.c(p, 4);
                        s = q.i(p + 4);
                        w = 10;
                        break;
                    case 4:
                        n = q.c(p, 4), s = g(p + 4, q), w = 10
                }
                if ("" == n)break;
                h += w + s;
                0 > e.indexOf(n) || (2 < u && (x = {message: {P: q.d(p + 8, 6), I: q.d(p + 8, 5), M: q.d(p + 8, 4)}, k: {K: q.d(p + 8 + 1, 7), F: q.d(p + 8 + 1, 3), H: q.d(p + 8 + 1, 2), C: q.d(p + 8 + 1, 1), u: q.d(p + 8 + 1, 0)}}), p += w, x && x.k.u && (g(p, q), p += 4, s -= 4), x && x.k.C ||
                    (n in b.b ? r = b.b[n] : "T" == n[0] && (r = b.b["T*"]), r = r ? r(p, s, q, x) : void 0, r = {id: n, size: s, description: n in b.frames ? b.frames[n] : "Unknown", data: r}, n in m ? (m[n].id && (m[n] = [m[n]]), m[n].push(r)) : m[n] = r))
            }
            n = m
        }
        for (var z in c)if (c.hasOwnProperty(z)) {
            a:{
                s = c[z];
                "string" == typeof s && (s = [s]);
                w = 0;
                for (h = void 0; h = s[w]; w++)if (h in n) {
                    a = n[h].data;
                    break a
                }
                a = void 0
            }
            a && (l[z] = a)
        }
        for (var A in n)n.hasOwnProperty(A) && (l[A] = n[A]);
        return l
    };
    h.ID3v2 = b
})(this);
(function () {
    function h(b) {
        var c;
        switch (b) {
            case 0:
                c = "iso-8859-1";
                break;
            case 1:
                c = "utf-16";
                break;
            case 2:
                c = "utf-16be";
                break;
            case 3:
                c = "utf-8"
        }
        return c
    }

    var g = "32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. lable side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(";");
    ID3v2.b.APIC = function (b, c, d, a, f) {
        f = f || "3";
        a = b;
        var v = h(d.a(b));
        switch (f) {
            case "2":
                var l = d.c(b + 1, 3);
                b += 4;
                break;
            case "3":
            case "4":
                l = d.e(b + 1, c - (b - a), ""), b += 1 + l.g
        }
        f = d.a(b, 1);
        f = g[f];
        v = d.e(b + 1, c - (b - a), v);
        b += 1 + v.g;
        return{format: l.toString(), type: f, description: v.toString(), data: d.l(b, a + c - b)}
    };
    ID3v2.b.COMM = function (b, c, d) {
        var a = b, f = h(d.a(b)), g = d.c(b + 1, 3), l = d.e(b + 4, c - 4, f);
        b += 4 + l.g;
        b = d.e(b, a + c - b, f);
        return{language: g, O: l.toString(), text: b.toString()}
    };
    ID3v2.b.COM = ID3v2.b.COMM;
    ID3v2.b.PIC = function (b, c, d, a) {
        return ID3v2.b.APIC(b,
            c, d, a, "2")
    };
    ID3v2.b.PCNT = function (b, c, d) {
        return d.J(b)
    };
    ID3v2.b.CNT = ID3v2.b.PCNT;
    ID3v2.b["T*"] = function (b, c, d) {
        var a = h(d.a(b));
        return d.e(b + 1, c - 1, a).toString()
    };
    ID3v2.b.TCON = function (b, c, d) {
        return ID3v2.b["T*"].apply(this, arguments).replace(/^\(\d+\)/, "")
    };
    ID3v2.b.TCO = ID3v2.b.TCON;
    ID3v2.b.USLT = function (b, c, d) {
        var a = b, f = h(d.a(b)), g = d.c(b + 1, 3), l = d.e(b + 4, c - 4, f);
        b += 4 + l.g;
        b = d.e(b, a + c - b, f);
        return{language: g, G: l.toString(), L: b.toString()}
    };
    ID3v2.b.ULT = ID3v2.b.USLT
})();
(function (h) {
    function g(b, a, f, h) {
        var l = b.i(a);
        if (0 == l)h(); else {
            var e = b.c(a + 4, 4);
            -1 < ["moov", "udta", "meta", "ilst"].indexOf(e) ? ("meta" == e && (a += 4), b.f([a + 8, a + 8 + 8], function () {
                g(b, a + 8, l - 8, h)
            })) : b.f([a + (e in c.j ? 0 : l), a + l + 8], function () {
                g(b, a + l, f, h)
            })
        }
    }

    function b(d, a, f, g, h) {
        h = void 0 === h ? "" : h + "  ";
        for (var e = f; e < f + g;) {
            var t = a.i(e);
            if (0 == t)break;
            var m = a.c(e + 4, 4);
            if (-1 < ["moov", "udta", "meta", "ilst"].indexOf(m)) {
                "meta" == m && (e += 4);
                b(d, a, e + 8, t - 8, h);
                break
            }
            if (c.j[m]) {
                var u = a.o(e + 16 + 1), k = c.j[m], u = c.types[u];
                if ("trkn" ==
                    m)d[k[0]] = a.a(e + 16 + 11), d.count = a.a(e + 16 + 13); else {
                    var m = e + 16 + 4 + 4, r = t - 16 - 4 - 4, n;
                    switch (u) {
                        case "text":
                            n = a.e(m, r, "UTF-8");
                            break;
                        case "uint8":
                            n = a.w(m);
                            break;
                        case "jpeg":
                        case "png":
                            n = {k: "image/" + u, data: a.l(m, r)}
                    }
                    d[k[0]] = "comment" === k[0] ? {text: n} : n
                }
            }
            e += t
        }
    }

    var c = h.r = {};
    c.types = {0: "uint8", 1: "text", 13: "jpeg", 14: "png", 21: "uint8"};
    c.j = {"\u00a9alb": ["album"], "\u00a9art": ["artist"], "\u00a9ART": ["artist"], aART: ["artist"], "\u00a9day": ["year"], "\u00a9nam": ["title"], "\u00a9gen": ["handleDragOver"], trkn: ["track"], "\u00a9wrt": ["composer"],
        "\u00a9too": ["encoder"], cprt: ["copyright"], covr: ["picture"], "\u00a9grp": ["grouping"], keyw: ["keyword"], "\u00a9lyr": ["lyrics"], "\u00a9cmt": ["comment"], tmpo: ["tempo"], cpil: ["compilation"], disk: ["disc"]};
    c.m = function (b, a) {
        b.f([0, 7], function () {
            g(b, 0, b.h(), a)
        })
    };
    c.n = function (c) {
        var a = {};
        b(a, c, 0, c.h());
        return a
    };
    h.ID4 = h.r
})(this);
