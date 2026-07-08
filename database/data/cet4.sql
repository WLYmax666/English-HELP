-- ============================================================================
-- 大学英语四级词汇 (CET-4) 数据
-- 共 100 词，涵盖高频核心词汇
-- 音频路径约定：/audio/cet4/<word>.mp3
-- ============================================================================
-- 使用方式：
--   source database/schema.sql;       -- 先建表
--   source database/data/cet4.sql;    -- 再导入数据
-- ============================================================================

INSERT INTO vocabulary (word, phonetic, definition, example_sentence, audio_url, difficulty_level, root_memory, movie_example, movie_example_cn) VALUES

('abandon',    '/əˈbændən/',    'v. 放弃；遗弃',    'They had to abandon the sinking ship.',             '/audio/cet4/abandon.mp3', 4,
 'a-（否定）+ band（捆绑）→ 不再捆绑 → 放弃', NULL, NULL),

('absolute',   '/ˈæbsəluːt/',  'adj. 绝对的；完全的',  'There is no absolute certainty in science.',         '/audio/cet4/absolute.mp3', 4,
 'ab-（加强）+ solute（解决）→ 完全解决 → 绝对的', NULL, NULL),

('absorb',     '/əbˈzɔːrb/',   'v. 吸收；吸引',    'Plants absorb carbon dioxide from the air.',          '/audio/cet4/absorb.mp3', 4,
 'ab-（离开）+ sorbere（吸）→ 吸走 → 吸收', NULL, NULL),

('abstract',   '/ˈæbstrækt/',  'adj. 抽象的；n. 摘要',  'The concept of freedom is abstract.',                '/audio/cet4/abstract.mp3', 4,
 'abs-（离开）+ tract（拉）→ 从具体中拉出来 → 抽象的', NULL, NULL),

('abuse',      '/əˈbjuːs/',    'n./v. 滥用；虐待',  'He was accused of abusing his power.',               '/audio/cet4/abuse.mp3', 4,
 'ab-（偏离）+ use（使用）→ 偏离正常使用 → 滥用', NULL, NULL),

('academic',   '/ˌækəˈdemɪk/', 'adj. 学术的；学院的',  'She has an academic background in physics.',          '/audio/cet4/academic.mp3', 4,
 '来自 Akademos（雅典英雄）→ 柏拉图讲学地 → 学术的', NULL, NULL),

('accelerate', '/əkˈseləreɪt/','v. 加速；促进',    'The car accelerated quickly.',                        '/audio/cet4/accelerate.mp3', 4,
 'ac-（加强）+ celer（快）→ 加快 → 加速', NULL, NULL),

('access',     '/ˈækses/',     'n. 通道；接近权；v. 访问', 'Students have access to the library 24/7.',       '/audio/cet4/access.mp3', 4,
 'ac-（接近）+ cess（走）→ 走近 → 通道/访问', NULL, NULL),

('accompany',  '/əˈkʌmpəni/',  'v. 陪伴；伴随',    'His wife accompanied him on the trip.',               '/audio/cet4/accompany.mp3', 4,
 'ac-（加强）+ company（同伴）→ 做同伴 → 陪伴', NULL, NULL),

('accomplish', '/əˈkɑːmplɪʃ/', 'v. 完成；实现',    'She accomplished her goal of running a marathon.',     '/audio/cet4/accomplish.mp3', 4,
 'ac-（加强）+ complish（充满）→ 完全填满 → 完成', NULL, NULL),

('accurate',   '/ˈækjərət/',   'adj. 准确的；精确的',  'The data must be accurate.',                         '/audio/cet4/accurate.mp3', 4,
 'ac-（加强）+ cur（小心）→ 十分小心 → 准确的', NULL, NULL),

('accuse',     '/əˈkjuːz/',    'v. 指控；指责',    'He was accused of stealing the money.',               '/audio/cet4/accuse.mp3', 4,
 'ac-（向）+ cause（诉讼）→ 提起诉讼 → 指控', NULL, NULL),

('achieve',    '/əˈtʃiːv/',    'v. 达到；取得',    'You can achieve anything if you work hard.',           '/audio/cet4/achieve.mp3', 4,
 'a-（到）+ chief（头）→ 到头 → 达到', NULL, NULL),

('acknowledge','/əkˈnɑːlɪdʒ/', 'v. 承认；致谢',    'He acknowledged his mistake.',                         '/audio/cet4/acknowledge.mp3', 4,
 'ac-（加强）+ know（知道）+ ledge → 使知道 → 承认', NULL, NULL),

('acquire',    '/əˈkwaɪər/',   'v. 获得；学到',    'She acquired a good knowledge of English.',            '/audio/cet4/acquire.mp3', 4,
 'ac-（加强）+ quire（寻求）→ 努力寻求 → 获得', '🎬 The Social Network — Mark Zuckerberg acquires the user base rapidly, turning a dorm-room project into a billion-dollar empire.马克·扎克伯格迅速获得了用户基础，将宿舍项目变成了十亿美元帝国。'),

('adapt',      '/əˈdæpt/',     'v. 适应；改编',    'Animals must adapt to their environment.',            '/audio/cet4/adapt.mp3', 4,
 'ad-（向）+ apt（适合）→ 使之适合 → 适应', NULL, NULL),

('adequate',   '/ˈædɪkwət/',   'adj. 充足的；适当的',  'The supply is not adequate for the demand.',        '/audio/cet4/adequate.mp3', 4,
 'ad-（加强）+ equ（相等）+ ate → 与所需相等的 → 充足的', NULL, NULL),

('adjust',     '/əˈdʒʌst/',    'v. 调整；适应',    'You need to adjust the settings.',                    '/audio/cet4/adjust.mp3', 4,
 'ad-（向）+ just（正确）→ 使之正确 → 调整', NULL, NULL),

('administration','/ədˌmɪnɪˈstreɪʃn/','n. 管理；行政；政府','She works in university administration.',            '/audio/cet4/administration.mp3', 4,
 'ad-（加强）+ minister（服务）+ ation → 为人民服务 → 行政/管理', NULL, NULL),

('admire',     '/ədˈmaɪər/',   'v. 钦佩；欣赏',    'I admire your courage.',                               '/audio/cet4/admire.mp3', 4,
 'ad-（向）+ mir（惊奇）→ 感到惊奇 → 钦佩', NULL, NULL),

('admit',      '/ədˈmɪt/',     'v. 承认；准许进入',  'He admitted that he was wrong.',                      '/audio/cet4/admit.mp3', 4,
 'ad-（向）+ mit（送）→ 送进去 → 准许进入', NULL, NULL),

('adopt',      '/əˈdɑːpt/',    'v. 采用；收养',    'The company adopted a new policy.',                    '/audio/cet4/adopt.mp3', 4,
 'ad-（加强）+ opt（选择）→ 选择出来 → 采用', NULL, NULL),

('advance',    '/ədˈvæns/',    'v. 前进；推进；n. 进步', 'Technology continues to advance rapidly.',         '/audio/cet4/advance.mp3', 4,
 'ab-（离开）+ ante（前）→ 从后面到前面 → 前进', NULL, NULL),

('advantage',  '/ədˈvæntɪdʒ/', 'n. 优势；有利条件',  'Being tall is an advantage in basketball.',            '/audio/cet4/advantage.mp3', 4,
 'advance（前进）+ age → 走在前面 → 优势', NULL, NULL),

('advertise',  '/ˈædvərtaɪz/', 'v. 做广告；宣传',  'They advertised the job in the newspaper.',            '/audio/cet4/advertise.mp3', 4,
 'ad-（向）+ vert（转）+ ise → 使人们的注意力转向 → 做广告', NULL, NULL),

('affect',     '/əˈfekt/',     'v. 影响；感动',    'The weather affects my mood.',                         '/audio/cet4/affect.mp3', 4,
 'af-（向）+ fect（做）→ 对某人做 → 影响', NULL, NULL),

('afford',     '/əˈfɔːrd/',    'v. 负担得起；提供',  'I can afford to buy this car.',                       '/audio/cet4/afford.mp3', 4,
 'af-（向）+ ford（向前）→ 能够向前 → 负担得起', NULL, NULL),

('aggressive', '/əˈɡresɪv/',   'adj. 侵略的；好斗的；积极的','He is an aggressive salesman.',                   '/audio/cet4/aggressive.mp3', 4,
 'ag-（向）+ gress（走）+ ive → 不断走向 → 积极的/侵略的', NULL, NULL),

('agree',      '/əˈɡriː/',     'v. 同意；赞成',    'I agree with your opinion.',                           '/audio/cet4/agree.mp3', 4,
 'a-（到）+ gree（令人愉快）→ 使人愉快 → 同意', NULL, NULL),

('agriculture','/ˈæɡrɪkʌltʃər/','n. 农业；农学',   'Agriculture is the backbone of the economy.',          '/audio/cet4/agriculture.mp3', 4,
 'agri（田地）+ culture（培养）→ 耕种田地 → 农业', NULL, NULL),

('allocate',   '/ˈæləkeɪt/',   'v. 分配；拨出',    'The government allocated funds for education.',         '/audio/cet4/allocate.mp3', 4,
 'al-（向）+ loc（地方）+ ate → 送到某个地方 → 分配', NULL, NULL),

('allow',      '/əˈlaʊ/',      'v. 允许；准许',    'Smoking is not allowed here.',                         '/audio/cet4/allow.mp3', 4,
 'al-（向）+ low（赞扬）→ 给予赞扬 → 允许', NULL, NULL),

('alternative','/ɔːlˈtɜːrnətɪv/','adj. 替代的；n. 替代方案','We need an alternative plan.',                     '/audio/cet4/alternative.mp3', 4,
 'alter（其他）+ native → 其他的 → 替代的', NULL, NULL),

('amaze',      '/əˈmeɪz/',     'v. 使惊奇',        'The magician amazed the audience.',                    '/audio/cet4/amaze.mp3', 4,
 'a-（加强）+ maze（迷惑）→ 使迷惑 → 使惊奇', NULL, NULL),

('ambition',   '/æmˈbɪʃn/',    'n. 雄心；野心',    'Her ambition is to become a doctor.',                  '/audio/cet4/ambition.mp3', 4,
 'ambi-（四处）+ ition（走）→ 四处奔走拉票 → 雄心', NULL, NULL),

('analyze',    '/ˈænəlaɪz/',   'v. 分析；解析',    'We need to analyze the data carefully.',               '/audio/cet4/analyze.mp3', 4,
 'ana-（分开）+ lyze（松开）→ 松开成各部分 → 分析', NULL, NULL),

('announce',   '/əˈnaʊns/',    'v. 宣布；通知',    'They announced their engagement.',                     '/audio/cet4/announce.mp3', 4,
 'an-（向）+ nounce（报告）→ 向众人报告 → 宣布', NULL, NULL),

('annual',     '/ˈænjuəl/',    'adj. 每年的；年度的',  'The annual conference is in March.',                '/audio/cet4/annual.mp3', 4,
 'ann（年）+ ual → 每年的', NULL, NULL),

('anxiety',    '/æŋˈzaɪəti/',  'n. 焦虑；担心',    'He felt great anxiety before the exam.',               '/audio/cet4/anxiety.mp3', 4,
 'ang（压抑）+ iety → 内心压抑 → 焦虑', NULL, NULL),

('apparent',   '/əˈpærənt/',   'adj. 明显的；表面的',  'It became apparent that he was lying.',             '/audio/cet4/apparent.mp3', 4,
 'ap-（向）+ par（出现）+ ent → 出现在眼前的 → 明显的', NULL, NULL),

('appeal',     '/əˈpiːl/',     'v./n. 呼吁；吸引；上诉', 'The idea appeals to young people.',                '/audio/cet4/appeal.mp3', 4,
 'ap-（向）+ peal（推动）→ 推动 toward → 呼吁/吸引', NULL, NULL),

('appear',     '/əˈpɪr/',      'v. 出现；似乎',    'A star appeared in the sky.',                          '/audio/cet4/appear.mp3', 4,
 'ap-（向）+ pear（出现）→ 出现在眼前 → 出现', NULL, NULL),

('appetite',   '/ˈæpɪtaɪt/',   'n. 食欲；欲望',    'Regular exercise improves your appetite.',             '/audio/cet4/appetite.mp3', 4,
 'ap-（向）+ pet（寻求）+ ite → 不断寻求 → 欲望', NULL, NULL),

('apply',      '/əˈplaɪ/',     'v. 申请；应用',    'I applied for the job yesterday.',                     '/audio/cet4/apply.mp3', 4,
 'ap-（向）+ ply（折叠）→ 靠向某物 → 申请/应用', NULL, NULL),

('appoint',    '/əˈpɔɪnt/',    'v. 任命；指定',    'They appointed him as the new manager.',              '/audio/cet4/appoint.mp3', 4,
 'ap-（向）+ point（点）→ 指向某个点 → 指定', NULL, NULL),

('appreciate', '/əˈpriːʃieɪt/','v. 感激；欣赏；升值',  'I really appreciate your help.',                    '/audio/cet4/appreciate.mp3', 4,
 'ap-（加强）+ preci（价值）+ ate → 看出价值 → 欣赏/感激', NULL, NULL),

('approach',   '/əˈproʊtʃ/',   'v. 接近；n. 方法',  'We need a new approach to this problem.',              '/audio/cet4/approach.mp3', 4,
 'ap-（向）+ proach（接近）→ 越来越近 → 接近', NULL, NULL),

('appropriate','/əˈproʊpriət/','adj. 适当的',      'Is this the appropriate time to ask?',                '/audio/cet4/appropriate.mp3', 4,
 'ap-（向）+ propri（自己的）+ ate → 变成自己的 → 适当的', NULL, NULL),

('approve',    '/əˈpruːv/',    'v. 批准；赞成',    'The committee approved the plan.',                     '/audio/cet4/approve.mp3', 4,
 'ap-（向）+ prove（证明）→ 证明可行 → 批准', NULL, NULL),

('arrange',    '/əˈreɪndʒ/',   'v. 安排；整理',    'I arranged the books alphabetically.',                 '/audio/cet4/arrange.mp3', 4,
 'ar-（向）+ range（排列）→ 排成行 → 安排', NULL, NULL),

('arrest',     '/əˈrest/',     'v./n. 逮捕；阻止',  'The police arrested the suspect.',                    '/audio/cet4/arrest.mp3', 4,
 'ar-（加强）+ rest（停留）→ 使停留 → 逮捕', NULL, NULL),

('artificial', '/ˌɑːrtɪˈfɪʃl/','adj. 人工的；虚伪的',  'The flowers are artificial.',                       '/audio/cet4/artificial.mp3', 4,
 'art（技艺）+ fic（做）+ ial → 用技艺做出的 → 人工的', NULL, NULL),

('aspect',     '/ˈæspekt/',    'n. 方面；面貌',    'Every problem has multiple aspects.',                  '/audio/cet4/aspect.mp3', 4,
 'a-（向）+ spect（看）→ 向某方向看 → 方面', NULL, NULL),

('assemble',   '/əˈsembl/',    'v. 集合；装配',    'The students assembled in the hall.',                  '/audio/cet4/assemble.mp3', 4,
 'as-（向）+ semble（一起）→ 使聚到一起 → 集合', NULL, NULL),

('assess',     '/əˈses/',      'v. 评估；评定',    'The test assesses your language skills.',              '/audio/cet4/assess.mp3', 4,
 'as-（在旁边）+ sess（坐）→ 坐在旁边评判 → 评估', NULL, NULL),

('asset',      '/ˈæset/',      'n. 资产；有利条件',  'Education is your greatest asset.',                   '/audio/cet4/asset.mp3', 4,
 'as-（向）+ sat（足够）→ 足够的东西 → 资产', NULL, NULL),

('assign',     '/əˈsaɪn/',     'v. 分配；指派',    'The teacher assigned homework for the weekend.',       '/audio/cet4/assign.mp3', 4,
 'as-（向）+ sign（标记）→ 标记给某人 → 分配', NULL, NULL),

('assist',     '/əˈsɪst/',     'v. 帮助；协助',    'Can you assist me with this task?',                    '/audio/cet4/assist.mp3', 4,
 'as-（在旁边）+ sist（站立）→ 站在旁边 → 辅助', NULL, NULL),

('associate',  '/əˈsoʊʃieɪt/', 'v. 联系；关联；n. 伙伴', 'I associate summer with freedom.',                  '/audio/cet4/associate.mp3', 4,
 'as-（加强）+ soci（同伴）+ ate → 成为同伴 → 联系/伙伴', NULL, NULL),

('assume',     '/əˈsuːm/',     'v. 假设；承担',    'I assume you already know the answer.',                '/audio/cet4/assume.mp3', 4,
 'as-（向）+ sume（拿取）→ 拿过来作为自己的 → 承担/假设', NULL, NULL),

('assure',     '/əˈʃʊr/',      'v. 保证；使确信',  'I assure you that everything will be fine.',           '/audio/cet4/assure.mp3', 4,
 'as-（向）+ sure（确定的）→ 使其确定 → 保证', NULL, NULL),

('atmosphere', '/ˈætməsfɪr/',  'n. 大气；氛围',    'The restaurant has a cozy atmosphere.',                '/audio/cet4/atmosphere.mp3', 4,
 'atmo（蒸汽）+ sphere（球体）→ 包裹地球的蒸汽层 → 大气', NULL, NULL),

('attach',     '/əˈtætʃ/',     'v. 附上；连接；依恋',  'Please attach your photo to the form.',            '/audio/cet4/attach.mp3', 4,
 'at-（向）+ tach（钉）→ 钉上去 → 附上/连接', NULL, NULL),

('attempt',    '/əˈtempt/',    'v./n. 尝试；企图',  'I will attempt to solve this problem.',                '/audio/cet4/attempt.mp3', 4,
 'at-（加强）+ tempt（试验）→ 反复试验 → 尝试', NULL, NULL),

('attend',     '/əˈtend/',     'v. 出席；参加；照料',  'All students must attend the meeting.',             '/audio/cet4/attend.mp3', 4,
 'at-（向）+ tend（伸展）→ 伸向某处 → 出席/照料', NULL, NULL),

('attitude',   '/ˈætɪtuːd/',   'n. 态度；看法',    'She has a positive attitude towards life.',            '/audio/cet4/attitude.mp3', 4,
 'apti（适合）+ tude → 适合的方式 → 态度', NULL, NULL),

('attract',    '/əˈtrækt/',    'v. 吸引；引起',    'The bright colors attract children.',                  '/audio/cet4/attract.mp3', 4,
 'at-（向）+ tract（拉）→ 拉向自己 → 吸引', NULL, NULL),

('authority',  '/əˈθɔːrəti/',  'n. 权威；权力；当局',  'He is an authority on ancient history.',            '/audio/cet4/authority.mp3', 4,
 'auctor（作者/创造者）+ ity → 创造者的力量 → 权威', NULL, NULL),

('available',  '/əˈveɪləbl/',  'adj. 可用的；可获得的', 'Tickets are available online.',                      '/audio/cet4/available.mp3', 4,
 'a-（向）+ vail（价值）+ able → 有价值的 → 可用的', NULL, NULL),

('average',    '/ˈævərɪdʒ/',   'adj. 平均的；普通的；n. 平均数', 'His grades are above average.',                 '/audio/cet4/average.mp3', 4,
 '来自 averie（损坏的货物）→ 计算损失的平均数 → 平均的', NULL, NULL),

('avoid',      '/əˈvɔɪd/',     'v. 避免；回避',    'Try to avoid making the same mistake.',                '/audio/cet4/avoid.mp3', 4,
 'a-（出去）+ void（空的）→ 使空出去 → 避免', NULL, NULL),

('balance',    '/ˈbæləns/',    'n. 平衡；余额；v. 使平衡', 'You need to balance work and life.',               '/audio/cet4/balance.mp3', 4,
 'bi-（两个）+ lanz（盘子）→ 两个盘子持平 → 平衡', NULL, NULL),

('bargain',    '/ˈbɑːrɡən/',   'n. 便宜货；v. 讨价还价', 'This dress was a real bargain.',                   '/audio/cet4/bargain.mp3', 4,
 '来自古法语 bargaigner（讨价还价）', NULL, NULL),

('barrier',    '/ˈbæriər/',    'n. 障碍；屏障',    'Language can be a barrier to communication.',          '/audio/cet4/barrier.mp3', 4,
 'bar（横木）+ rier → 用横木拦住 → 障碍', NULL, NULL),

('behave',     '/bɪˈheɪv/',    'v. 表现；举止；运转',  'Children should behave well in public.',            '/audio/cet4/behave.mp3', 4,
 'be-（使）+ have（拥有）→ 使自己拥有某种方式 → 表现', NULL, NULL),

('belief',     '/bɪˈliːf/',    'n. 信念；信仰',    'He has a strong belief in justice.',                   '/audio/cet4/belief.mp3', 4,
 'be-（加强）+ lief（爱/信任）→ 信任 → 信念', NULL, NULL),

('belong',     '/bɪˈlɔːŋ/',    'v. 属于；应被放置',  'This book belongs to me.',                            '/audio/cet4/belong.mp3', 4,
 'be-（加强）+ long（长）→ 长期拥有 → 属于', NULL, NULL),

('benefit',    '/ˈbenɪfɪt/',   'n. 利益；v. 有益于',  'Regular exercise benefits your health.',             '/audio/cet4/benefit.mp3', 4,
 'bene（好）+ fit（做）→ 做得好 → 利益', NULL, NULL),

('betray',     '/bɪˈtreɪ/',    'v. 背叛；泄露',    'He betrayed his friend\'s trust.',                    '/audio/cet4/betray.mp3', 4,
 'be-（加强）+ tray（交出）→ 交出去 → 背叛', '🎬 The Godfather — Michael Corleone realizes those closest to him may betray him, yet he never lets emotion cloud his judgment.迈克尔·柯里昂意识到最亲近的人也可能背叛他，但他从不让情感影响判断。'),

('blame',      '/bleɪm/',      'v. 责备；n. 责任',  'Don\'t blame others for your mistakes.',               '/audio/cet4/blame.mp3', 4, NULL, NULL, NULL),

('bother',     '/ˈbɑːðər/',    'v. 打扰；烦恼',    'Sorry to bother you, but I have a question.',          '/audio/cet4/bother.mp3', 4, NULL, NULL, NULL),

('boundary',   '/ˈbaʊndəri/',  'n. 边界；界限',    'The river forms the boundary between the two countries.','/audio/cet4/boundary.mp3', 4,
 'bound（边界）+ ary → 界限', NULL, NULL),

('brilliant',  '/ˈbrɪliənt/',  'adj. 灿烂的；杰出的',  'She had a brilliant idea.',                          '/audio/cet4/brilliant.mp3', 4,
 'brilli（发光）+ ant → 发光的 → 灿烂的', NULL, NULL),

('budget',     '/ˈbʌdʒɪt/',    'n. 预算；v. 编预算',  'We need to stay within our budget.',                  '/audio/cet4/budget.mp3', 4,
 '来自 bougette（小皮包）→ 包里的钱 → 预算', NULL, NULL),

('burden',     '/ˈbɜːrdn/',    'n. 负担；v. 使负重担',  'He carries the burden of responsibility.',          '/audio/cet4/burden.mp3', 4, NULL, NULL, NULL),

('calculate',  '/ˈkælkjuleɪt/','v. 计算；估计',    'Calculate the total cost first.',                      '/audio/cet4/calculate.mp3', 4,
 'calc（石头）+ ulate → 古人用石子计数 → 计算', NULL, NULL),

('campaign',   '/kæmˈpeɪn/',   'n. 运动；战役；v. 发起运动', 'They launched a marketing campaign.',              '/audio/cet4/campaign.mp3', 4,
 'camp（田野）+ aign → 在田野上进行的军事行动 → 战役/运动', NULL, NULL),

('capable',    '/ˈkeɪpəbl/',   'adj. 有能力的',    'She is capable of handling this alone.',               '/audio/cet4/capable.mp3', 4,
 'cap（拿取）+ able → 能够拿取的 → 有能力的', NULL, NULL),

('capacity',   '/kəˈpæsəti/',  'n. 能力；容量；职位',  'The hall has a seating capacity of 500.',           '/audio/cet4/capacity.mp3', 4,
 'cap（拿取）+ acity → 能拿多少 → 容量/能力', NULL, NULL),

('capture',    '/ˈkæptʃər/',   'v. 捕获；夺取；记录',  'The photographer captured the moment perfectly.',   '/audio/cet4/capture.mp3', 4,
 'cap（拿取）+ ture → 拿住 → 捕获', NULL, NULL),

('career',     '/kəˈrɪr/',     'n. 职业；生涯',    'She is at the peak of her career.',                    '/audio/cet4/career.mp3', 4,
 'car（车）+ eer → 马车行驶的道路 → 生涯/职业', NULL, NULL),

('caution',    '/ˈkɔːʃn/',     'n. 谨慎；警告；v. 警告', 'You should proceed with caution.',                  '/audio/cet4/caution.mp3', 4, NULL, NULL, NULL),

('cease',      '/siːs/',       'v. 停止；终止',    'The company has ceased operations.',                   '/audio/cet4/cease.mp3', 4,
 '来自拉丁语 cedere（撤退）→ 停止', NULL, NULL),

('challenge',  '/ˈtʃælɪndʒ/',  'n. 挑战；v. 向…挑战',  'Learning a new language is a challenge.',            '/audio/cet4/challenge.mp3', 4, NULL, NULL, NULL),

('character',  '/ˈkærəktər/',  'n. 性格；特征；角色',  'He has a strong character.',                         '/audio/cet4/character.mp3', 4, NULL, NULL, NULL),

('charity',    '/ˈtʃærəti/',   'n. 慈善；施舍',    'She donates money to charity every year.',             '/audio/cet4/charity.mp3', 4,
 'car（爱）+ ity → 爱心的表现 → 慈善', NULL, NULL),

('circulate',  '/ˈsɜːrkjəleɪt/','v. 循环；流传',   'Blood circulates through the body.',                   '/audio/cet4/circulate.mp3', 4,
 'circ（圆）+ ulate → 绕圆圈 → 循环', NULL, NULL),

('circumstance','/ˈsɜːrkəmstæns/','n. 环境；情况', 'Under no circumstances should you lie.',               '/audio/cet4/circumstance.mp3', 4,
 'circum（周围）+ stance（站立）→ 周围站立的东西 → 环境', NULL, NULL),

('civil',      '/ˈsɪvl/',      'adj. 公民的；文明的；民用的',  'We have civil rights and responsibilities.',      '/audio/cet4/civil.mp3', 4,
 'civ（公民）+ il → 公民的', NULL, NULL),

('claim',      '/kleɪm/',      'v. 声称；要求；n. 索赔',  'He claimed that he was innocent.',                 '/audio/cet4/claim.mp3', 4,
 '来自拉丁语 clamare（呼喊）→ 大声说出来 → 声称', NULL, NULL),

('clarify',    '/ˈklærəfaɪ/',  'v. 澄清；阐明',    'Could you clarify your point?',                       '/audio/cet4/clarify.mp3', 4,
 'clar（清楚）+ ify（使）→ 使清楚 → 澄清', NULL, NULL),

('classify',   '/ˈklæsɪfaɪ/',  'v. 分类；归类',    'Books are classified by subject.',                     '/audio/cet4/classify.mp3', 4,
 'class（类别）+ ify（使）→ 使成为类别 → 分类', NULL, NULL),

('climate',    '/ˈklaɪmət/',   'n. 气候；风气',    'The climate is changing rapidly.',                     '/audio/cet4/climate.mp3', 4,
 '来自希腊语 klima（倾斜）→ 根据太阳倾斜角度 → 气候', NULL, NULL),

('collapse',   '/kəˈlæps/',    'v./n. 倒塌；崩溃',  'The building collapsed in the earthquake.',            '/audio/cet4/collapse.mp3', 4,
 'col-（一起）+ lapse（滑落）→ 一起滑落 → 倒塌', NULL, NULL),

('command',    '/kəˈmænd/',    'v. 命令；指挥；掌握',  'The general commanded his troops to advance.',       '/audio/cet4/command.mp3', 4,
 'com-（加强）+ mand（命令）→ 命令', NULL, NULL),

('comment',    '/ˈkɑːment/',   'n./v. 评论；注释',  'He refused to comment on the matter.',                '/audio/cet4/comment.mp3', 4,
 'com-（加强）+ ment（思考）→ 深入思考后的意见 → 评论', NULL, NULL),

('commit',     '/kəˈmɪt/',     'v. 犯（罪）；承诺；投入',  'You must commit yourself to your goals.',         '/audio/cet4/commit.mp3', 4,
 'com-（加强）+ mit（送）→ 一起送出 → 委托/承诺', NULL, NULL),

('communicate','/kəˈmjuːnɪkeɪt/','v. 交流；沟通；传播', 'We communicate through email and phone.',             '/audio/cet4/communicate.mp3', 4,
 'com-（共同）+ mun（服务）+ icate → 互相服务 → 交流', NULL, NULL),

('community',  '/kəˈmjuːnəti/', 'n. 社区；团体；共同体的', 'There is a strong sense of community here.',         '/audio/cet4/community.mp3', 4,
 'com-（共同）+ mun（服务）+ ity → 共同服务 → 社区', NULL, NULL),

('companion',  '/kəmˈpæniən/',  'n. 同伴；伙伴',    'My dog is my faithful companion.',                    '/audio/cet4/companion.mp3', 4,
 'com-（共同）+ pan（面包）+ ion → 一起吃面包的人 → 同伴', NULL, NULL),

('compare',    '/kəmˈper/',     'v. 比较；对比',    'Compare these two products before buying.',            '/audio/cet4/compare.mp3', 4,
 'com-（共同）+ par（相等）→ 放在一起看是否相等 → 比较', NULL, NULL),

('compete',    '/kəmˈpiːt/',    'v. 竞争；比赛',    'Companies compete for market share.',                  '/audio/cet4/compete.mp3', 4,
 'com-（共同）+ pete（寻求）→ 共同追求 → 竞争', NULL, NULL),

('complain',   '/kəmˈpleɪn/',   'v. 抱怨；投诉',    'Customers complained about the service.',              '/audio/cet4/complain.mp3', 4,
 'com-（加强）+ plaint（捶胸）→ 捶胸表示不满 → 抱怨', NULL, NULL),

('complete',   '/kəmˈpliːt/',   'adj. 完整的；v. 完成',  'The project is now complete.',                      '/audio/cet4/complete.mp3', 4,
 'com-（加强）+ plete（充满）→ 完全充满 → 完整的', NULL, NULL),

('complex',    '/kəmˈpleks/',   'adj. 复杂的；n. 综合体',  'The problem is very complex.',                     '/audio/cet4/complex.mp3', 4,
 'com-（共同）+ plex（编织）→ 编织在一起的 → 复杂的', NULL, NULL),

('complicate', '/ˈkɑːmplɪkeɪt/','v. 使复杂化',     'Don\'t complicate things unnecessarily.',              '/audio/cet4/complicate.mp3', 4,
 'com-（共同）+ plic（折叠）+ ate → 折叠在一起 → 使复杂', NULL, NULL),

('component',  '/kəmˈpoʊnənt/', 'n. 组成部分；成分',  'Each component of the machine is important.',        '/audio/cet4/component.mp3', 4,
 'com-（共同）+ pon（放置）+ ent → 放在一起的东西 → 组成部分', NULL, NULL),

('concentrate','/ˈkɑːnsntreɪt/','v. 集中；专注',    'I need to concentrate on my studies.',                 '/audio/cet4/concentrate.mp3', 4,
 'con-（共同）+ centr（中心）+ ate → 都到中心来 → 集中', NULL, NULL),

('concept',    '/ˈkɑːnsept/',   'n. 概念；观念',    'The concept of time is abstract.',                     '/audio/cet4/concept.mp3', 4,
 'con-（共同）+ cept（拿取）→ 共同拿取的想法 → 概念', NULL, NULL),

('concern',    '/kənˈsɜːrn/',   'v. 涉及；关心；n. 担忧',  'This concerns everyone.',                          '/audio/cet4/concern.mp3', 4,
 'con-（共同）+ cern（分开）→ 把分开的放一起看 → 涉及', NULL, NULL),

('conclude',   '/kənˈkluːd/',   'v. 结束；得出结论',  'What can you conclude from the data?',               '/audio/cet4/conclude.mp3', 4,
 'con-（共同）+ clude（关闭）→ 一起关闭 → 结束/总结', NULL, NULL),

('condition',  '/kənˈdɪʃn/',    'n. 条件；状况；环境',  'The car is in excellent condition.',                '/audio/cet4/condition.mp3', 4,
 'con-（共同）+ dit（说）+ ion → 共同约定的说法 → 条件', NULL, NULL),

('conduct',    '/kənˈdʌkt/',    'v. 引导；指挥；行为',  'The experiment was conducted by experts.',           '/audio/cet4/conduct.mp3', 4,
 'con-（共同）+ duct（引导）→ 引导到一起 → 指挥/引导', NULL, NULL),

('confidence', '/ˈkɑːnfɪdəns/', 'n. 信心；信任',    'She spoke with confidence.',                           '/audio/cet4/confidence.mp3', 4,
 'con-（加强）+ fid（信任）+ ence → 信任自己 → 信心', NULL, NULL),

('confirm',    '/kənˈfɜːrm/',   'v. 确认；证实',    'Please confirm your reservation by email.',            '/audio/cet4/confirm.mp3', 4,
 'con-（加强）+ firm（坚固）→ 使其更坚固 → 确认', NULL, NULL),

('conflict',   '/ˈkɑːnflɪkt/',  'n./v. 冲突；矛盾',  'The two accounts conflict with each other.',           '/audio/cet4/conflict.mp3', 4,
 'con-（共同）+ flict（打击）→ 互相打击 → 冲突', NULL, NULL),

('confuse',    '/kənˈfjuːz/',   'v. 使困惑；混淆',  'The instructions confused me.',                        '/audio/cet4/confuse.mp3', 4,
 'con-（共同）+ fuse（倾倒）→ 倒在一起 → 混淆', NULL, NULL),

('connect',    '/kəˈnekt/',     'v. 连接；联系',    'This road connects the two cities.',                   '/audio/cet4/connect.mp3', 4,
 'con-（共同）+ nect（捆绑）→ 捆绑在一起 → 连接', NULL, NULL),

('conscious',  '/ˈkɑːnʃəs/',    'adj. 有意识的；清醒的',  'He was conscious of the risks involved.',          '/audio/cet4/conscious.mp3', 4,
 'con-（共同）+ sci（知道）+ ous → 共同知道 → 有意识的', NULL, NULL),

('consequence','/ˈkɑːnsɪkwens/','n. 结果；后果',    'Every action has a consequence.',                      '/audio/cet4/consequence.mp3', 4,
 'con-（共同）+ sequ（跟随）+ ence → 跟随而来的 → 结果', NULL, NULL),

('conservative','/kənˈsɜːrvətɪv/','adj. 保守的；传统的',  'She has a conservative view on education.',        '/audio/cet4/conservative.mp3', 4,
 'con-（共同）+ serv（保持）+ ative → 保持现状的 → 保守的', NULL, NULL),

('consider',   '/kənˈsɪdər/',   'v. 考虑；认为',    'Please consider my proposal.',                         '/audio/cet4/consider.mp3', 4,
 'con-（共同）+ sider（星星）→ 观察星相 → 仔细考虑', NULL, NULL),

('consistent', '/kənˈsɪstənt/', 'adj. 一致的；始终如一的',  'His actions are consistent with his words.',      '/audio/cet4/consistent.mp3', 4,
 'con-（共同）+ sist（站立）+ ent → 站在一起的 → 一致的', NULL, NULL),

('constant',   '/ˈkɑːnstənt/',  'adj. 不断的；恒定的',  'The machine runs at a constant speed.',             '/audio/cet4/constant.mp3', 4,
 'con-（加强）+ st（站立）+ ant → 一直站着的 → 不变的', NULL, NULL),

('construct',  '/kənˈstrʌkt/',  'v. 建造；构建',    'They plan to construct a new bridge.',                 '/audio/cet4/construct.mp3', 4,
 'con-（共同）+ struct（建造）→ 一起建造 → 建造', NULL, NULL),

('consume',    '/kənˈsuːm/',    'v. 消费；消耗；吃',  'This car consumes too much fuel.',                   '/audio/cet4/consume.mp3', 4,
 'con-（加强）+ sume（拿取）→ 全部拿光 → 消耗/消费', NULL, NULL),

('contact',    '/ˈkɑːntækt/',   'n./v. 联系；接触',  'Please contact me if you have questions.',            '/audio/cet4/contact.mp3', 4,
 'con-（共同）+ tact（触摸）→ 互相触摸 → 接触', NULL, NULL),

('contain',    '/kənˈteɪn/',    'v. 包含；容纳；控制',  'This box contains 12 items.',                       '/audio/cet4/contain.mp3', 4,
 'con-（共同）+ tain（保持）→ 保持在一起 → 包含', NULL, NULL),

('contemporary','/kənˈtempəreri/','adj. 当代的；同时代的','She enjoys contemporary art.',                       '/audio/cet4/contemporary.mp3', 4,
 'con-（共同）+ tempor（时间）+ ary → 同一时间的 → 当代的', NULL, NULL),

('content',    '/ˈkɑːntent/',   'n. 内容；目录；adj. 满意的',  'The content of the book is fascinating.',         '/audio/cet4/content.mp3', 4,
 'con-（共同）+ tent（保持）→ 保持在一起的东西 → 内容', NULL, NULL),

('contest',    '/ˈkɑːntest/',   'n. 比赛；竞赛',    'She won first prize in the speech contest.',           '/audio/cet4/contest.mp3', 4,
 'con-（共同）+ test（见证）→ 共同见证 → 比赛', NULL, NULL),

('continue',   '/kənˈtɪnjuː/',  'v. 继续；延续',    'The rain continued all day.',                          '/audio/cet4/continue.mp3', 4,
 'con-（共同）+ tin（保持）+ ue → 保持在一起 → 继续', NULL, NULL),

('contract',   '/ˈkɑːntrækt/',  'n. 合同；v. 收缩；感染',  'Sign the contract before starting work.',          '/audio/cet4/contract.mp3', 4,
 'con-（共同）+ tract（拉）→ 拉到一起 → 收缩/合同', NULL, NULL),

('contrast',   '/ˈkɑːntræst/',  'n./v. 对比；差异',  'The contrast between rich and poor is striking.',     '/audio/cet4/contrast.mp3', 4,
 'contra-（相反）+ st（站立）→ 站在对面 → 对比', NULL, NULL),

('contribute', '/kənˈtrɪbjuːt/','v. 贡献；捐献；促成',  'Everyone should contribute to the team.',           '/audio/cet4/contribute.mp3', 4,
 'con-（共同）+ tribute（给予）→ 共同给出 → 贡献', NULL, NULL),

('convenient', '/kənˈviːniənt/','adj. 方便的；便利的',  'The hotel is convenient to the airport.',           '/audio/cet4/convenient.mp3', 4,
 'con-（共同）+ veni（来）+ ent → 能一起来到的 → 方便的', NULL, NULL),

('convince',   '/kənˈvɪns/',    'v. 说服；使确信',  'I convinced him to join our team.',                    '/audio/cet4/convince.mp3', 4,
 'con-（加强）+ vince（征服）→ 用言语征服 → 说服', NULL, NULL);
