/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, Matter, WP, Router, navMargin, basicAnimationSpeed */

var blobsArray = [{
      label: 'about',
      shape: '416.1940002441 555.6420288086 L 416.7430002689 568.8560285568 L 418.8580002785 577.3250284195 L 423.2430005074 582.1580286026 L 430.5990004539 584.4630286694 L 435.7310004234 584.7330286801 L 441.0920004845 584.0940286815 L 446.3300004005 582.6590287387 L 451.0920004845 580.5420286357 L 468.5969996452 569.4800283611 L 484.6749987602 556.6580288112 L 499.6149992943 542.4670288265 L 513.7079997063 527.2960283458 L 519.6899995804 518.4850284755 L 520.9709995985 510.8500282466 L 518.4059995413 503.4060280025 L 512.8529995680 495.1680280864 L 511.4989994764 493.5510279834 L 510.0309995413 492.0200280845 L 508.5349994898 490.5090281665 L 507.0959994793 488.9510280788 L 474.6000010967 451.7020275295 L 442.0000026226 414.5350277126 L 409.7960040569 377.0540287197 L 378.4880034924 338.8620273769 L 349.6400039196 302.8500263393 L 320.2090041637 267.4140255153 L 289.7220046520 232.9000255764 L 257.7040030956 199.6550266445 L 246.7590034008 187.9430267513 L 236.5550029278 175.4680263698 L 226.8810031414 162.5170261562 L 217.5240027905 149.3780262172 L 213.9300026894 142.9910261333 L 211.1830027103 136.0090262592 L 208.7140026093 128.8100263774 L 205.9540026188 121.7730261981 L 204.7120026350 119.6220261753 L 203.0190025568 117.5740260780 L 201.0910025835 115.9980261028 L 199.1440025568 115.2640260756 L 197.0620025396 115.5870260894 L 194.8220025301 116.7290260494 L 192.7380024195 118.3840260208 L 191.1260024309 120.2470260561 L 181.7980023623 134.7740264833 L 178.9610022306 144.5880266130 L 182.7270022631 154.2070270479 L 193.2090026140 168.1470275819 L 212.8430033922 191.7400279939 L 232.8020030260 215.0630279481 L 251.6980029345 239.2800270021 L 268.1410037279 265.5530277193 L 288.9170027971 303.4770275056 L 310.3180018663 341.0670276582 L 331.9460021257 378.5370288789 L 353.4040023088 416.0990291536 L 364.4970027208 436.2640300691 L 375.3770028353 456.5510307252 L 386.3460026979 476.7830310762 L 397.7080031633 496.7850318849 L 405.9610034227 511.0890317857 L 412.8030034304 525.4590316713 L 416.7190033197 540.2070318162 L 416.1940002441 555.6420288086',
      offset: {
        x: 52,
        y: 115
      }
    }, {
      label: 'blog',
      shape: '520.4160156250 431.0119934082 L 520.4540156275 427.4269933701 L 520.5130156316 424.2079932690 L 520.5070156315 421.2399933338 L 520.3520156303 418.4089932442 L 519.3880155841 414.8549933434 L 517.4950155774 412.9609932899 L 514.9700154820 412.8649932891 L 512.1090154210 414.7069932967 L 506.0370153943 418.8279931098 L 499.6190151731 420.3749931604 L 493.0380153218 420.1959931403 L 486.4790153066 419.1369931251 L 467.9170150319 414.9019929916 L 450.2690143147 408.6729929000 L 433.9760150472 399.5569927245 L 419.4780149022 386.6569931060 L 415.9330148259 383.3029930145 L 411.9910149137 380.3069929630 L 407.9740147153 377.3659929782 L 404.2040147344 374.1779930145 L 395.5960149327 366.3699929267 L 386.9790153066 358.5669929534 L 379.1160153905 350.0339929610 L 372.7720155278 340.0349933654 L 370.5200154344 333.6939932853 L 370.8020154396 328.7749931365 L 373.7710155407 324.9949931651 L 379.5790156284 322.0679931194 L 383.8110155025 320.2959931642 L 387.9240154186 318.1889930516 L 391.9890154758 315.9449930936 L 396.0790156284 313.7639930993 L 398.3420156399 312.6159930974 L 400.6140157143 311.4829930812 L 402.9090157906 310.4039930850 L 405.2410158077 309.4179930836 L 410.2390159527 307.5079929978 L 415.2590159336 305.6559929997 L 420.2800158421 303.8029929549 L 425.2770160595 301.8909930140 L 428.7200161377 300.4339929968 L 432.1260162750 298.8829929978 L 435.5410162369 297.3579930216 L 439.0080162445 295.9779930264 L 449.7790161530 292.1499929577 L 460.5710159699 288.3829929978 L 471.3590160767 284.6039929539 L 482.1150156418 280.7389929444 L 486.5680157105 278.3479929119 L 489.5130158821 274.9999928623 L 490.7000159184 270.8029928356 L 489.8780159513 265.8639927059 L 486.7810158292 257.3239927441 L 483.5310158292 248.8249931484 L 479.9400157491 240.4999933392 L 475.8170156041 232.4829931408 L 470.8970155278 226.2019930035 L 465.0320157567 222.9149930626 L 458.0420159856 222.2139930874 L 449.7470159093 223.6889931113 L 435.4320163289 228.2459932715 L 421.7650165120 234.0529934317 L 408.6860160390 241.1609932333 L 396.1360158483 249.6199928671 L 385.0570153752 257.2439929396 L 373.5490150014 264.2929927260 L 361.8570146123 271.0939928442 L 350.2220143834 277.9729930311 L 349.2490143338 278.6529930383 L 348.3040142814 279.3899930865 L 347.3410142222 280.0649930984 L 346.3160142461 280.5599931031 L 342.8090142766 281.9679930955 L 339.2380141774 283.4649930745 L 335.7810141603 284.4689930230 L 332.6180140534 284.3989930153 L 324.7710139314 282.2389929295 L 316.9460141221 279.7409930229 L 309.5010139504 276.5949931145 L 302.7960140267 272.4909930229 L 284.8100139657 258.5909934044 L 267.1120140115 244.3059935570 L 249.6560146371 229.7169938087 L 232.3970138589 214.9039940834 L 224.4050137559 209.6669940948 L 216.2190138856 207.3409941196 L 207.8080136338 207.4279941246 L 199.1400134126 209.4299942181 L 196.2930132905 210.7069941685 L 193.5590133229 212.6239942238 L 191.2340132752 214.9749942943 L 189.6150133172 217.5539942905 L 187.0490133325 224.0599943325 L 184.8520133058 230.7279945537 L 182.7430133382 237.4409943745 L 180.4410132924 244.0789943859 L 179.3460132638 249.1129943058 L 180.0970132509 253.3289943859 L 182.4850132624 256.8919943497 L 186.3020131746 259.9659944698 L 192.8180129686 264.1719943210 L 199.3280131975 268.3849941418 L 205.8210132280 272.6239939854 L 212.2830131212 276.9079939052 L 225.5670135180 285.7659937069 L 238.8470132509 294.6319938824 L 252.0690133730 303.5809942409 L 265.1790130297 312.6869941875 L 275.6980130831 320.1389943287 L 286.1300132433 327.7269941494 L 296.3340137163 335.5889941379 L 306.1680133501 343.8629943058 L 317.5060136477 354.3629943058 L 328.5200135866 365.2289944813 L 339.3630139986 376.2839947864 L 350.1870143572 387.3509951755 L 357.9090144793 394.9829951450 L 365.6470143953 402.6209951565 L 373.0730145136 410.4959951565 L 379.8620145479 418.8369947597 L 395.4480149904 437.5719953701 L 412.6720159212 454.4809957668 L 431.0150163332 470.1779962704 L 449.9580171267 485.2759958431 L 459.6360175768 490.7759958431 L 469.5740173021 492.8269959614 L 479.6910169283 492.2089959309 L 489.9050166765 489.7019959614 L 494.4480168978 487.9999960586 L 498.9330170313 485.6669961140 L 502.8350169817 482.7509962246 L 505.6290168921 479.3019963428 L 511.7780170599 467.7439967319 L 516.8810172239 455.8879967853 L 520.0550172487 443.6669970676 L 520.4160156250 431.0119934082',
      offset: {
        x: -39,
        y: -25
      }
    }, {
      label: 'collabs',
      shape: '245.3919982910 322.7799987793 L 247.6749982834 327.6749987602 L 250.0369982719 331.8439989090 L 252.9509983063 334.9599988461 L 262.4539985657 344.0589988232 L 269.0579986572 354.5759990215 L 273.4019985199 366.1589992046 L 276.1269984245 378.4549996853 L 281.4239983559 405.1380002499 L 289.6849980354 430.1669995785 L 303.2799983025 452.4190003872 L 324.5799975395 470.7720010281 L 331.1249976158 474.2220010757 L 336.9639978409 475.6590011120 L 342.8069977760 474.9310011268 L 349.3639979362 471.8890010715 L 354.5889978409 468.9950010180 L 360.0419979095 466.4360010028 L 365.6589980125 464.3200010657 L 371.3759980202 462.7550010085 L 379.2149982452 461.4740009904 L 387.1659984589 460.7060009837 L 395.1319985390 459.9880009890 L 403.0179986954 458.8580009937 L 411.0219984055 457.2530009747 L 418.9949984550 455.3780009747 L 426.8209986687 453.0790009499 L 434.3849987984 450.2020008564 L 443.4169983864 443.9660007954 L 448.2549986839 435.4540007114 L 448.8439986706 425.4630005360 L 445.1269986629 414.7920010090 L 439.5449988842 402.0750010014 L 436.8219988346 389.1400005817 L 437.2399988174 375.9500010014 L 441.0829987526 362.4670011997 L 443.2019987106 357.2330009937 L 445.2119987011 351.9500010014 L 447.0629987717 346.6150009632 L 448.7059988976 341.2230007648 L 453.3579988480 323.8120014668 L 456.5999989510 306.3050014973 L 457.0259989798 288.5800011158 L 453.2299989760 270.5160019398 L 446.0489987433 253.8640015125 L 436.2709988654 240.0790016651 L 422.9419983923 230.1050016880 L 405.1089982092 224.8860018253 L 391.9009980261 224.4030018151 L 378.9919976294 225.9410018027 L 366.3269976676 229.0040017664 L 353.8499974310 233.1000019610 L 345.6059969962 237.1590019763 L 339.0479969084 242.8060022891 L 334.2379969656 250.0080024302 L 331.2379969656 258.7320024073 L 328.3679970801 266.6320025027 L 323.7269972861 272.5200025141 L 317.3789972365 276.5530025065 L 309.3879970610 278.8860024512 L 295.1069969237 282.2170025408 L 281.4339965880 287.0730024874 L 268.3919967711 293.3860026896 L 256.0029968321 301.0860024989 L 252.3119968474 304.3930024207 L 249.0849968493 308.4720024168 L 245.9949969351 312.9590024054 L 245.3919982910 322.7799987793',
      offset: {
        x: -42,
        y: 55
      }
    }, {
      label: 'installations',
      shape: '337.1380004883 334.5559997559 L 343.0400004387 339.7289996147 L 345.0880005360 345.4679994583 L 344.6180005074 351.5139994621 L 342.9640004635 357.6089992523 L 338.3730003834 381.8759994507 L 338.9400004148 405.5459995270 L 344.1560004950 428.6679992676 L 353.5090001822 451.2899990082 L 356.1060003042 455.9799990654 L 359.0610002279 460.5039992332 L 362.3110002279 464.8309993744 L 365.7890001535 468.9279994965 L 371.7760001421 473.9199995995 L 378.3979998827 476.4229996204 L 385.5749999285 476.5439996272 L 393.2279998064 474.3889996558 L 405.8589993715 467.0849997550 L 414.4469996691 457.1449992210 L 419.3039995432 444.1949994117 L 420.7419995070 427.8629986793 L 420.1419994831 403.2749993354 L 420.0259994864 378.7099988014 L 422.2439994216 354.3269993812 L 428.6469992995 330.2849995643 L 428.9889993072 329.1759995967 L 429.2099993080 328.0129996091 L 429.3299993128 326.8279996663 L 429.3689993136 325.6509996206 L 429.5109993182 305.2269998342 L 429.6519993208 284.8020005971 L 429.7209993266 264.3780008107 L 429.6479993202 243.9550004750 L 428.0889993049 233.8100000173 L 423.6429992057 226.9020000249 L 416.3749990799 223.5219999105 L 406.3509989120 223.9609999210 L 396.8159990646 226.6189999133 L 387.4699993469 230.1579999477 L 378.2359991409 234.1509999782 L 369.0379991867 238.1739997417 L 367.5069992878 239.2199997455 L 366.1639993526 240.8249997646 L 365.0779993869 242.7219998389 L 364.3169994093 244.6449999362 L 361.2849993445 252.3969997913 L 357.5949992873 256.3759998828 L 352.2279991843 257.0699999481 L 344.1669993140 254.9659998566 L 339.2999992110 253.2289998680 L 334.4389991499 251.4649999291 L 329.5489992835 249.8259999901 L 324.5939993598 248.4649999291 L 320.2879991271 248.0609999150 L 317.1209990717 249.2079998702 L 315.4529990889 252.0929998606 L 315.6399990954 256.9039997309 L 316.4319990315 260.5809997767 L 317.2079989947 264.2629996985 L 317.9039990343 267.9559997767 L 318.4569990672 271.6649998873 L 318.6309990771 277.4899996966 L 317.1769990809 280.7709995955 L 313.8009991534 281.8079995364 L 308.2099990733 280.8989994973 L 298.6069993861 279.6799995154 L 290.1569995768 281.3619994372 L 282.9589996226 285.9659995288 L 277.1119995005 293.5169996470 L 271.3829994090 306.6589998454 L 270.4929994233 317.9450000972 L 273.9439993985 329.0040001124 L 281.2379995473 341.4660000056 L 292.5949998982 353.1369995326 L 305.6909996159 357.5459994525 L 318.9799991734 354.0919994563 L 330.9149995930 342.1759990901 L 332.2609995492 340.3129990548 L 333.7689995654 338.4839990586 L 335.4059996493 336.5959990472 L 337.1380004883 334.5559997559',
      offset: {
        x: 30,
        y: 25
      }
    }, {
      label: 'press',
      shape: '181.0469970703 467.5660095215 L 180.6409970522 468.1870095134 L 180.2349970341 468.8090094924 L 179.8279970288 469.4310094714 L 179.4209970236 470.0530094504 L 184.0009969473 479.0390095115 L 188.3979967833 488.2370094657 L 193.3369969130 496.8030094504 L 199.5419968367 503.8950094581 L 218.6149967909 516.8320097327 L 239.5629967451 525.4140095115 L 261.7119969130 530.4170092940 L 284.3899964094 532.6180092692 L 298.2799967527 531.8770092726 L 312.2689970732 529.0770093203 L 326.2739971876 525.2750092745 L 340.2119969130 521.5290092230 L 343.9969967604 520.3230092525 L 347.7519968748 518.5280092955 L 351.0629967451 516.2090092897 L 353.5119966269 513.4320093393 L 363.9159969091 496.9350095987 L 374.1799968481 480.3390089273 L 384.0359967947 463.5240083933 L 393.2189964056 446.3700090647 L 402.6659959555 426.4130083323 L 411.4689964056 406.1320081949 L 420.1419967413 385.7810083628 L 429.1999963522 365.6140085459 L 438.5809959173 348.7510076761 L 450.1079963446 333.7710081339 L 463.9859966040 320.7640081644 L 480.4189971685 309.8200079203 L 493.4709972143 300.4840074778 L 504.0679973364 288.7670074701 L 512.4279969931 275.1730076075 L 518.7709969282 260.2040077448 L 520.5669969320 250.3760076761 L 518.3109968901 243.5270076990 L 512.2289971113 240.1290076971 L 502.5489968061 240.6500076652 L 486.6389969587 244.5830077529 L 470.8449972868 249.0920075774 L 455.2919968367 254.2980074286 L 440.1069964170 260.3190073371 L 431.2189959288 265.0170072913 L 422.8249958754 270.9890074134 L 415.0299957991 277.8560075164 L 407.9389957190 285.2380074859 L 401.8459957838 291.6680073142 L 395.4279955626 297.3840073943 L 388.4589956999 302.2160071731 L 380.7129958868 305.9930071235 L 368.1009963751 308.5140070319 L 357.3919967413 305.9170069098 L 349.2539972067 298.5220069289 L 344.3599971533 286.6490067840 L 342.1909972429 270.8330067992 L 342.8369972706 255.3710069060 L 346.6079971790 240.3850068450 L 353.8169972897 225.9970063567 L 358.6189973354 218.7670063376 L 363.5959975719 211.6470064521 L 368.6789977551 204.5980066657 L 373.8029978275 197.5810064673 L 378.3939979076 190.8300065398 L 382.2159979343 183.7070063949 L 384.9089980125 175.9550065398 L 386.1119980812 167.3170060515 L 383.5009980202 167.3910060599 L 381.2589979172 167.4190060608 L 379.2859978676 167.5140060671 L 377.4809978008 167.7890060730 L 366.2849977016 170.3330062218 L 355.0939977169 172.9010063000 L 343.9339978695 175.5840063877 L 332.8299977779 178.4710064717 L 327.5089976788 180.1800064631 L 322.2869975567 182.2560064383 L 317.1219975948 184.5240063258 L 311.9729974270 186.8070063181 L 307.6089975834 189.3950063772 L 304.4259974957 192.8330063410 L 302.3699975014 197.0920061655 L 301.3859974742 202.1440062113 L 300.1549975276 214.7640060969 L 298.8099974990 227.3770060129 L 297.6229974627 239.9940056391 L 296.8649974465 252.6270060129 L 296.6039974689 286.8000063486 L 298.7229974270 320.7250055857 L 303.8989975452 354.2790064402 L 312.8099977970 387.3390078135 L 316.6449978352 400.4860081263 L 319.4639978409 413.7530083247 L 321.4279978275 427.1460079737 L 322.6949977875 440.6730084009 L 321.8189978004 455.2560085841 L 317.4849976897 468.6980089732 L 310.2799977660 479.5490088053 L 300.7919978499 486.3590087481 L 293.3869976401 489.1320087500 L 285.8219975829 491.5190088339 L 278.1669973731 493.6610087939 L 270.4919971824 495.7020086832 L 268.0329970717 496.1150086708 L 265.4579970241 496.1580086723 L 262.8559970260 495.9250086620 L 260.3159970641 495.5110086575 L 244.0829972625 491.7380086556 L 228.3609971404 486.6220084801 L 213.1609973311 480.0740086213 L 198.4949969649 472.0040089265 L 194.5369967818 470.2400089875 L 190.1419968009 469.1830089465 L 185.5609969497 468.4270089641 L 181.0469970703 467.5660095215',
      offset: {
        x: -20,
        y: 55
      }
    }, {
      label: 'shop',
      shape: '245.0310058594 384.2950134277 L 245.7280059457 393.7280130386 L 246.2510059476 403.2260131836 L 247.3130059838 412.5220136642 L 249.6270061135 421.3510141373 L 256.0860062242 437.0640144348 L 263.6210060716 452.2830142975 L 272.3440056443 466.9820146561 L 282.3680058122 481.1350145340 L 292.4060059190 488.8750143051 L 304.1920061707 490.8470143080 L 315.3630066514 487.7230142355 L 323.5590067506 480.1770142317 L 328.8740068078 473.1600140333 L 335.1690068841 467.5510138273 L 342.4530068040 463.1970137358 L 350.7340069413 459.9460138083 L 361.1420069337 455.1930135489 L 369.4470072389 448.2160133123 L 375.2900071740 439.2820132971 L 378.3110070825 428.6560128927 L 379.3270071149 415.6440128088 L 379.3880071156 402.5090125799 L 379.0940070860 389.3210128546 L 379.0460070819 376.1500123739 L 379.0960070863 369.1170123816 L 379.2340070829 362.0400122404 L 379.8800071105 355.1050122976 L 381.4540071115 348.4980124235 L 390.6280068979 330.1660116911 L 403.7080068216 317.3020113707 L 420.6560067758 309.7660115957 L 441.4320058450 307.4180115461 L 446.8490056619 306.9590115249 L 450.9630055055 305.1900114715 L 453.6480054483 301.6790115535 L 454.7760054693 295.9940116107 L 455.1670054719 281.3890120685 L 453.9760054871 267.2600123584 L 449.6320056245 253.9220120609 L 440.5670060441 241.6900117099 L 435.9570059106 236.7260114849 L 431.7070059106 231.3900115192 L 427.6110057160 225.8940117061 L 423.4630059525 220.4530117214 L 414.6900061890 213.2170116603 L 403.6780061051 209.5760116279 L 391.8810061738 209.5410116278 L 380.7530059144 213.1230116449 L 366.8340062425 220.1270118318 L 352.7360066697 226.7900119387 L 338.5380067155 233.2560120188 L 324.3190068528 239.6680121981 L 315.2010068223 243.5410123430 L 306.2440070435 247.5590124689 L 297.7880067155 252.6640124880 L 290.1730069444 259.7990127169 L 270.0200070664 287.7730136476 L 255.3810071275 317.6260142885 L 246.8520068452 349.6890140139 L 245.0310058594 384.2950134277',
      offset: {
        x: 15,
        y: 60
      }
    }];

var bumpersArray = [
      '260.6940002441 321.5820007324 L 264.8150000572 316.9740009308 L 268.8470001221 312.3790006638 L 273.0050001144 308.0460004807 L 277.5050001144 304.2200005054 L 280.4580001831 302.8440004587 L 284.1430001259 302.2130004764 L 287.8619999886 302.3800004721 L 290.9189999104 303.3980004787 L 296.7759997845 307.0860004425 L 302.4199998379 311.1870002747 L 307.7509996891 315.6780004501 L 312.6679995060 320.5350003242 L 322.8879997730 329.3710007668 L 334.1229994297 335.0850005150 L 346.3699991703 337.8200006485 L 359.6239988804 337.7200006470 L 372.9159986973 338.2600006685 L 385.1519987583 341.9520005807 L 396.7949984074 347.4270004854 L 408.3079988956 353.3160004243 L 412.2959988117 355.2770003900 L 416.2619988918 357.2860004529 L 420.1949989796 359.3570005521 L 424.0849988461 361.5040006265 L 426.9029989243 363.0180005655 L 429.7379989624 364.5960006341 L 432.2809989452 366.3910005912 L 434.2229989767 368.5600005016 L 436.3299990892 372.1450005397 L 438.1429990530 376.0790005550 L 439.1989990473 379.9840005264 L 439.0349990577 383.4830005988 L 436.6679989547 387.6110003814 L 432.8409988135 390.0900004730 L 428.0169989318 391.2330004796 L 422.6609989852 391.3520004824 L 416.8789989203 391.2440004796 L 411.0829989165 391.4270004928 L 405.2809988707 391.7510005236 L 399.4819990844 392.0660005212 L 398.5739990324 392.1400005296 L 397.6519990414 392.3030005321 L 396.7859990448 392.5830005333 L 396.0459990352 393.0100005493 L 386.6069989055 397.6050008163 L 378.4039988369 396.6850007996 L 370.9189987034 392.1950010285 L 363.6329984516 386.0810011849 L 350.4739980549 374.9300011620 L 337.2029981464 363.9090012535 L 323.7719983906 353.0920008644 L 310.1329984516 342.5520009026 L 305.2309985012 339.4970008358 L 299.7909984440 337.1080008969 L 294.0629982799 335.2600008473 L 288.2999982685 333.8300007805 L 281.0419983715 332.1540007815 L 273.9649982303 329.9620008692 L 267.1539983600 326.6410007700 L 260.6940002441 321.5820007324',
      '340.2609863281 375.6839904785 L 362.3469867706 374.7349904180 L 379.6709861755 365.4259904027 L 390.4359865189 349.2499898076 L 392.8469865322 327.6979897618 L 392.2269865274 324.7249897122 L 391.1149865389 321.7939897180 L 389.7379865646 318.9089897275 L 388.3219865561 316.0739896894 L 381.0479863882 301.1349895597 L 373.7429865599 286.2099893689 L 366.4729865789 271.2689893842 L 359.3039864302 256.2809894681 L 358.3359863758 253.6239894032 L 357.7459863424 250.7749894261 L 357.4269863367 247.8389893174 L 357.2699863315 244.9239893556 L 357.8629863858 239.1559892297 L 360.1679864526 234.8269892335 L 364.2079864144 231.7099891305 L 370.0019865632 229.5809891820 L 377.6149864793 227.2319892049 L 385.0819864869 224.2999890447 L 392.4519863725 221.0379889607 L 399.7739863992 217.6989889741 L 404.9169865251 215.7839890122 L 408.0839865804 215.9029890150 L 409.6919866204 218.3879891485 L 410.1579866409 223.5709892362 L 411.0369866490 233.4999891371 L 413.3859866261 242.9589887708 L 416.9259865880 252.0719886869 L 421.3789866567 260.9629884809 L 424.3259866834 266.5279885381 L 427.0419867635 272.2549887747 L 429.3109868169 278.1209889501 L 430.9169867635 284.1029888242 L 433.1379867196 296.6709886640 L 434.9709867835 309.3159891218 L 436.6619867682 321.9909893125 L 438.4539867043 334.6489893049 L 439.3139867187 340.3659893125 L 440.2519868016 346.0799890608 L 441.4089868665 351.7339893430 L 442.9259868264 357.2699891180 L 445.6369867921 369.8719893545 L 445.8149868101 382.2479897588 L 443.7259868234 394.4329901785 L 439.6369865984 406.4629899114 L 429.4329861253 426.6739903539 L 416.9079865068 445.2369900793 L 402.6479862779 462.5399895757 L 387.2399862856 478.9699898809 L 384.2679861635 481.0519898981 L 380.5289860815 482.4329899400 L 376.4379860014 483.3249899000 L 372.4089861959 483.9399899095 L 356.1179858297 483.4699898809 L 341.8009854406 478.2259899229 L 328.7769852728 469.8829895109 L 316.3649855703 460.1149898618 L 311.1309853643 455.8649898618 L 305.9119855016 451.5949898809 L 300.6739855856 447.3499899954 L 295.3809853643 443.1759902090 L 284.0319853872 432.6649905294 L 274.7099848837 420.7159901708 L 266.9689847082 407.6689902395 L 260.3659845442 393.8649903387 L 257.4219845384 382.2889901251 L 257.8209845573 370.7679902166 L 260.1289846450 359.3259898275 L 262.9089846164 347.9859896749 L 265.0409845859 336.6279898733 L 265.8929845840 325.4099894613 L 264.8709846288 314.2619896978 L 261.3809846193 303.1139899343 L 259.3609846383 297.8989897817 L 257.6729846746 292.5379897207 L 256.1179846078 287.1179896444 L 254.4959846288 281.7239895910 L 253.9629846364 278.7799895853 L 254.5709846765 276.6729894727 L 256.3529846221 275.2929894775 L 259.3419847041 274.5309895128 L 268.6559848338 273.1499894708 L 277.9549846202 271.6629894823 L 287.2609843761 270.2619894594 L 296.5939845592 269.1409894079 L 298.9479846507 269.5519893914 L 301.5609845668 270.8849893361 L 303.7499846965 272.6999893934 L 304.8309846669 274.5599894077 L 306.6519846469 285.5369896442 L 308.2669846565 296.5549892932 L 309.5499846488 307.6049894840 L 310.3739846498 318.6789898425 L 310.3759846499 326.2609896213 L 309.7719846179 333.8799895793 L 308.7749845793 341.4939894229 L 307.5979845335 349.0609893352 L 307.3089845290 353.9229893237 L 308.1949845066 358.1179894954 L 310.4159844627 361.5809895545 L 314.1319845428 364.2489895374 L 320.5719846000 367.2899894267 L 327.1089847793 370.1379894763 L 333.6879847755 372.8999895602 L 340.2609863281 375.6839904785',
      '362.5180053711 432.6560058594 L 350.9450054169 429.8180058002 L 340.9390058517 423.8880054951 L 332.1480054855 415.7400057316 L 324.2190055847 406.2460052967 L 313.5960054398 391.0170052052 L 304.5760049820 374.9180042744 L 297.2650051117 358.0310051441 L 291.7670049667 340.4380047321 L 289.1500048637 325.3180048466 L 289.1530048638 310.1250050068 L 292.1700048237 295.2990047932 L 298.5930046826 281.2800047398 L 302.9850048809 276.3940045834 L 309.0010046749 272.4410045147 L 315.8430046826 269.2590045929 L 322.7130045681 266.6870045662 L 327.2410044461 265.9790045619 L 332.1540045529 266.3840045631 L 337.2350044041 267.2140046060 L 342.2690043240 267.7810046375 L 348.9220042019 267.8800046444 L 355.5870041638 267.8340046406 L 362.2230043202 267.9560046420 L 368.7910041600 268.5580046400 L 374.4040040760 269.6240046248 L 379.9600038319 271.1890046820 L 385.3400039463 273.2390046343 L 390.4270038395 275.7610044703 L 391.8310038834 277.7280044779 L 392.6310038953 281.0830044970 L 392.7240038975 284.8220045790 L 392.0100039109 287.9410045370 L 388.3430038556 301.0310046896 L 389.1000038846 313.3700044379 L 392.8820039495 325.3700044379 L 398.2900039419 337.4410045370 L 404.5590039953 352.4750049338 L 409.0450040563 368.0220048651 L 411.1260041459 384.1270044073 L 410.1770040854 400.8360040411 L 404.0300042494 414.2790038809 L 391.9020039900 426.0170037970 L 376.9960038527 433.1200039610 L 362.5180053711 432.6560058594',
    ];

// Matter module aliases
var Engine = Matter.Engine,
    Events = Matter.Events,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Bounds = Matter.Bounds,
    Detector = Matter.Detector,
    Vertices = Matter.Vertices,
//     Vector = Matter.Vector,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Sleeping = Matter.Sleeping,
    currentLocation = window.location.href;

var _engine,
  _mouseConstraint,
  // NOT ACTUALLY USED?
  _sceneWidth,
  _sceneHeight;

var gravityTimeout,
  maximizeTimeout,
  minimizeTimeout;

var Nav = {
  minimized: false,
  options: {

    // Initial and reapplied forces
    maxForce: 0.2,
    minForce: -0.2,

    // Initial and reapplied torque
    maxTorque: 25,
    minTorque: -25,

    loopTimer: 1, // Time between each loop iteration in seconds
    background: 'rgba(0,0,0,0)', //World background
    velocityThreshold: 0.20, // The threshold to check if force should be reapplied or not

    gravity: 0, // World default gravity
    altGravity: 0.2, // World alternative gravity
    gravityReboundAnimationSpeed: 700,

    // Blobs options
    blobsOptions : {
      frictionAir: 0.01,
      friction: 0.1,
      restitution: 0.7,
      render: {
        strokeStyle: 'rgb(26,26,26)',
        fillStyle: 'rgb(26,26,26)'
      },
    },

    // Bumpers options
    bumpersOptions: {
      frictionAir: 1,
      friction: 0,
      restitution: 1,
      draggable: true,
      render: {
        strokeStyle: 'rgb(26,26,26)',
        fillStyle: 'rgba(0,0,0,0)'
      }
    },

    // Walls options
    wallOptions: {
      isStatic: true,
      restitution: 0.3,
      friction: 0.1,
      render: {
        visible: false,
        strokeStyle: 'red'
      }
    }
  },

  random: function(min, max) {
    return Math.random() * (max - min) + min;
  },

  init: function() {

    Nav.container = document.getElementById('nav');

    // create a Matter.js engine
    _engine = Engine.create(Nav.container, {
      timing: {
        timeScale: 1,
      },
      render: {
        options: {
          width: Nav.container.clientWidth,
          height: Nav.container.clientHeight,
          background: Nav.options.background,
          wireframes: false,
          /*
          showAngleIndicator: true,
          showBroadphase: true,
          showBounds: true,
          showDebug: true,
          showCollisions: true,
          showVelocity: true,
          showAxes: true,
          showPositions: true,
          showShadows: true
          */
        }
      },
      world: {
        gravity: {
          y: Nav.options.gravity
        },

        // Infinity cuz it doesn't rly matter https://github.com/liabru/matter-js/issues/67
        bounds: {
          min: {
            x: -Infinity,
            y: -Infinity
          },
          max: {
            x: Infinity,
            y: Infinity
          }
        },
      }
    });

    // add a mouse controlled constraint
    _mouseConstraint = MouseConstraint.create(_engine, {
      constraint: {
        render: {
          lineWidth: 0,
          strokeStyle: 'rgba(0,0,0,0)',
        }
      }
    });
    World.add(_engine.world, _mouseConstraint );

    // run the engine
    Engine.run(_engine);

    // Create main composites: blobs & walls
    Nav.walls = Composite.create();
    Nav.blobs = Composite.create();
    Nav.bumpers = Composite.create();
    Composite.add(_engine.world, [Nav.walls, Nav.blobs, Nav.bumpers]);

    // is main the best name here?
    Nav.main();
    Nav.updateScene();
  },
  main: function() {
    var _world = _engine.world;
    var counter = 0;
    var isDragging = false;

    Events.on(_engine, 'tick', function() {
      var blobs = Composite.allBodies(Nav.blobs);
      var bumpers = Composite.allBodies(Nav.bumpers);

      /*
       *  Loop that runs to reapply force and stuff
       */
      counter++;
      // Every [Nav.options.loopTimer] seconds
      if(counter >= 60 * Nav.options.loopTimer) {
        // Re apply force
        for(var i = 0; i < blobs.length; i++) {
          var blob = blobs[i];
          if( Math.abs(blob.velocity.x) < Nav.options.velocityThreshold && Math.abs(blob.velocity.y) < Nav.options.velocityThreshold ) {
            Body.applyForce(
              blob,
              { x: 0, y: 0 },
              {
                x: Nav.random(Nav.options.minForce, Nav.options.maxForce),
                y: Nav.random(Nav.options.minForce, Nav.options.maxForce)
              }
            );
            blob.torque = Nav.random(Nav.options.minTorque, Nav.options.maxTorque);
          }
        }
      }

      /*
       * Mouse constraint stuff
       */
      var mouse = _mouseConstraint.mouse,
          inBlob = false,
          inBumper = false,
          inMinNav = false;

      Events.on(_mouseConstraint, 'startdrag', function() {
        isDragging = true;
      });

      Events.on(_mouseConstraint, 'enddrag', function() {
        isDragging = false;
      });

      if (Nav.minimized) {
        inMinNav = true;
        if( mouse.button === 0 ) {
          Nav.maximize();
        }
      } else {
        for (var i = 0; i < blobs.length; i++) {
          var blob = blobs[i];

          // Check if mouse is inside a blob
          if (Bounds.contains(blob.bounds, mouse.position) && !isDragging && Detector.canCollide(blob.collisionFilter, _mouseConstraint.collisionFilter)) {
            inBlob = true;

            // Mouse down
            if( mouse.button === 0 ) {
              var newLocation = WP.origin + '/' + blob.label;
              if (blob.label === 'shop') {
                window.location = WP.shopUrl;
              } else {
                if (currentLocation === newLocation || currentLocation === newLocation + '/') {
                  Nav.minimize();
                } else {
                  Router.loadBlob(blob.label);
                }
              }
              break;
            }
          }
        }
      }

      // Bumpers
      for(var i = 0; i < bumpers.length; i++) {
        var bumper = bumpers[i];

        // Check if mouse is inside a bumper
        if (Bounds.contains(bumper.bounds, mouse.position) && !isDragging && Detector.canCollide(bumper.collisionFilter, _mouseConstraint.collisionFilter)) {
          inBumper = true;
        }
      }


      if(inMinNav) {
        Nav.container.style.cursor = 's-resize';
      } else if(inBlob) {
        Nav.container.style.cursor = 'pointer';
      } else if(inBumper) {
        Nav.container.style.cursor = 'move';
      } else {
        Nav.container.style.removeProperty('cursor');
      }
    });

    // Add all blobs
    for(var i = 0; i < blobsArray.length; i++) {
      var blob = blobsArray[i];
      Composite.add(Nav.blobs, Body.create( Common.extend({
        label: blob.label,
        vertices: Vertices.fromPath(blob.shape),
        position: {
          x: Nav.random(0, _engine.render.options.width),
          y: Nav.random(0, _engine.render.options.height),
        },
        force: {
          x: Nav.random(Nav.options.minForce, Nav.options.maxForce),
          y: Nav.random(Nav.options.minForce, Nav.options.maxForce)
        },
        torque: Nav.random(Nav.options.minTorque, Nav.options.maxTorque)
      },
      Common.extend({
        render: {
          fillStyle: '#000',
          sprite: {
            texture:  WP.templateDir + '/img/sprites/' + blob.label + '.png',
            xOffset: blob.offset.x,
            yOffset: blob.offset.y
          }
        }
      },  Nav.options.blobsOptions
      ))));
    }

    for(var i = 0; i < bumpersArray.length; i++) {
//       var name = "bumper" + (i+1);
      Composite.add(Nav.bumpers, Body.create( Common.extend({
          vertices: Vertices.fromPath(bumpersArray[i]),
          position: {
            x: Nav.random(0, _engine.render.options.width),
            y: Nav.random(0, _engine.render.options.height),
          },
        },
        Common.extend({
          render: {
            fillStyle: '#000',
            }
          },
          Nav.options.bumpersOptions
        )
      )));
    }

    Nav.ready();

  },
  ready: function() {

    // Scale blobs & bumpers
    if( Nav.container.clientWidth < 1300 ) {
      Nav.updateBlobs(Nav.container.clientWidth / 1300);
    }

    // Minimize
    if (!($('body').hasClass('home'))) {
      Nav.minimize();
    }

    window.addEventListener('resize', Nav.updateScene );
  },

  updateScene: function() {
    if (!_engine) {
      return;
    }

    if( Nav.container.clientWidth < 1300 ) {
      Nav.updateBlobs(Nav.container.clientWidth / _engine.render.options.width);
    }

    var renderOptions = _engine.render.options,
      canvas = _engine.render.canvas;

    canvas.width = renderOptions.width = Nav.container.clientWidth;
    canvas.height = renderOptions.height = Nav.container.clientHeight;

    Nav.updateWalls();
  },
  updateBlobs: function(scale) {
    if (!_engine) {
      return;
    }

    var blobs = Composite.allBodies(Nav.blobs);
    for(var i = 0; i < blobs.length; i++) {
      var blob = blobs[i];
      Body.scale(blob, scale, scale);
    }

    var bumpers = Composite.allBodies(Nav.bumpers);
    for(var i = 0; i < bumpers.length; i++) {
      var bumper = bumpers[i];
      Body.scale(bumper, scale, scale);
    }
  },
  updateWalls: function() {
    if (!_engine) {
      return;
    }

    if(this.walls.bodies.length > 0) {
      Composite.clear(Nav.walls);
    }

    // Add walls
    Composite.add( Nav.walls, [
      Bodies.rectangle(_engine.render.options.width/2, 0, _engine.render.options.width, 1, Common.extend({ label: 'topWall'}, Nav.options.wallOptions)),
      Bodies.rectangle(_engine.render.options.width/2, _engine.render.options.height, _engine.render.options.width, 1, Common.extend({ label: 'bottomWall'}, Nav.options.wallOptions)),
      Bodies.rectangle(0, _engine.render.options.height/2, 1, _engine.render.options.height, Common.extend({ label: 'leftWall'}, Nav.options.wallOptions)),
      Bodies.rectangle(_engine.render.options.width, _engine.render.options.height/2, 1, _engine.render.options.height, Common.extend({ label: 'rightWall'}, Nav.options.wallOptions))
    ]);

  },

  minimize: function () {
    if(Nav.minimized) {
      return;
    }

    Nav.switchGravity();
    var height = $(window).height() - navMargin;
    Nav.container.style.top = '-' + height + 'px';
    minimizeTimeout = setTimeout( function() {
      Nav.minimized = true;
    }, basicAnimationSpeed);
  },
  maximize: function() {
    if(!Nav.minimized) {
      return;
    }

    currentLocation = window.location.href;

    Nav.switchGravity();
    Nav.container.style.top = '0';
    maximizeTimeout = setTimeout( function() {
      Nav.minimized = false;
    }, basicAnimationSpeed);
  },
  switchGravity: function() {
    if(Nav.minimized) {
      _engine.world.gravity.y = Nav.options.altGravity * -2;
      gravityTimeout = setTimeout( function() {
        _engine.world.gravity.y = Nav.options.gravity;
      }, Nav.options.gravityReboundAnimationSpeed);
    } else {
      _engine.world.gravity.y = Nav.options.altGravity;
    }
  }

};

window.addEventListener('load', Nav.init);


// THIS MONKEY PATCH GOES IN THE FORK

// Monkey patch to make convex blobs draggable
MouseConstraint.update = function(mouseConstraint, bodies) {
  var mouse = mouseConstraint.mouse,
  constraint = mouseConstraint.constraint,
  body = mouseConstraint.body;

  if (mouse.button === 0) {
    if (!constraint.bodyB) {
      for (var i = 0; i < bodies.length; i++) {
        body = bodies[i];
        if (body.draggable && Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
            constraint.pointA = mouse.position;
            constraint.bodyB = mouseConstraint.body = body;
            constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
            constraint.angleB = body.angle;

            Sleeping.set(body, false);
            Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });
          }
      }
    } else {
      Sleeping.set(constraint.bodyB, false);
      constraint.pointA = mouse.position;
    }
  } else {
    constraint.bodyB = mouseConstraint.body = null;
    constraint.pointB = null;

    if (body) {
      Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
    }
  }
};