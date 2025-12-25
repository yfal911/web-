// 全局变量
var currentUser = null;
var users = [];
var courses = [];
var assignments = [];
var exams = [];
var grades = [];
var logs = [];

// 初始化数据
function initializeData() {
    // 初始化用户数据
    users = [
        { id: 1, username: 'admin', password: 'admin123', type: 'admin', name: '系统管理员', email: 'admin@example.com', locked: false, loginAttempts: 0 },
        { id: 2, username: 'teacher1', password: 'teacher123', type: 'teacher', name: '张老师', email: 'teacher1@example.com', locked: false, loginAttempts: 0 }
    ];
    
    // 初始化课程数据
    courses = [
        { 
            id: 1, 
            name: 'Web前端开发', 
            code: 'WEB101', 
            category: 'computer', 
            description: '本课程介绍Web前端开发的基础知识和实践技能，包括HTML、CSS和JavaScript等核心技术。', 
            teacherId: 2, 
            teacherName: '张老师',
            status: 'published',
            materials: [
                { id: 1, name: '前端开发基础.pdf', type: 'document' },
                { id: 2, name: 'HTML5教程视频.mp4', type: 'video' },
                { id: 3, name: 'JavaScript入门.mp3', type: 'audio' }
            ],
            students: [],
            rating: 4.8,
            enrollmentCount: 25,
            createTime: '2025-01-10'
        },
        { 
            id: 2, 
            name: '数据结构与算法', 
            code: 'CS201', 
            category: 'computer', 
            description: '本课程深入讲解常见的数据结构和算法，包括数组、链表、栈、队列、树、图等。', 
            teacherId: 2, 
            teacherName: '张老师',
            status: 'published',
            materials: [
                { id: 4, name: '算法导论.pdf', type: 'document' },
                { id: 5, name: '排序算法.mp4', type: 'video' }
            ],
            students: [],
            rating: 4.6,
            enrollmentCount: 20,
            createTime: '2025-01-15'
        },
        { 
            id: 3, 
            name: '高等数学', 
            code: 'MATH101', 
            category: 'math', 
            description: '本课程涵盖高等数学的基础理论，包括极限、导数、积分等核心概念。', 
            teacherId: 2, 
            teacherName: '张老师',
            status: 'published',
            materials: [
                { id: 6, name: '微积分基础.pdf', type: 'document' }
            ],
            students: [],
            rating: 4.3,
            enrollmentCount: 30,
            createTime: '2025-02-01'
        },
        { 
            id: 4, 
            name: '大学英语', 
            code: 'ENG101', 
            category: 'english', 
            description: '本课程旨在提高学生的英语听说读写能力，为专业学习打下坚实基础。', 
            teacherId: 2, 
            teacherName: '张老师',
            status: 'draft',
            materials: [],
            students: [],
            rating: 0,
            enrollmentCount: 0,
            createTime: '2025-02-10'
        }
    ];
    
    // 初始化作业数据
    assignments = [
        {
            id: 1,
            title: 'HTML基础练习',
            description: '使用HTML创建一个简单的个人介绍页面',
            courseId: 1,
            courseName: 'Web前端开发',
            deadline: '2025-06-15T23:59',
            weight: 10,
            submissions: []
        },
        {
            id: 2,
            title: 'CSS样式设计',
            description: '使用CSS美化HTML页面，实现响应式设计',
            courseId: 1,
            courseName: 'Web前端开发',
            deadline: '2025-06-20T23:59',
            weight: 15,
            submissions: []
        },
        {
            id: 3,
            title: '算法复杂度分析',
            description: '分析给定算法的时间和空间复杂度',
            courseId: 2,
            courseName: '数据结构与算法',
            deadline: '2025-06-25T23:59',
            weight: 20,
            submissions: []
        }
    ];
    
    // 初始化考试数据
    exams = [
        {
            id: 1,
            title: 'Web前端开发期中考试',
            description: 'HTML、CSS和JavaScript基础知识测试',
            courseId: 1,
            courseName: 'Web前端开发',
            startTime: '2025-06-15T09:00',
            duration: 120,
            weight: 30,
            results: []
        },
        {
            id: 2,
            title: '数据结构期中考试',
            description: '数据结构基础知识测试',
            courseId: 2,
            courseName: '数据结构与算法',
            startTime: '2025-06-20T14:00',
            duration: 120,
            weight: 40,
            results: []
        }
    ];
    
    // 初始化成绩数据
    grades = [];
    
    // 初始化日志数据
    logs = [
        { id: 1, userId: 1, userName: '系统管理员', action: '登录', target: '', timestamp: '2025-06-14T09:00:00', type: 'login' },
        { id: 2, userId: 2, userName: '张老师', action: '创建课程', target: 'Web前端开发', timestamp: '2025-06-14T10:30:00', type: 'course' },
        { id: 4, userId: 2, userName: '张老师', action: '批改作业', target: 'HTML基础练习', timestamp: '2025-06-14T14:20:00', type: 'grade' },
        { id: 5, userId: 1, userName: '系统管理员', action: '系统设置', target: '最大登录尝试次数', timestamp: '2025-06-14T16:45:00', type: 'system' }
    ];
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadCourses();
    initializeEventListeners();
    
    // 模拟页面缓慢滑动展示全貌
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    }, 1000);
});

// 初始化事件监听器
function initializeEventListeners() {
    // 导航链接点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新活动导航状态
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 登录按钮点击事件
    document.getElementById('loginBtn').addEventListener('click', function() {
        document.getElementById('loginModal').style.display = 'block';
    });
    
    // 注册按钮点击事件
    document.getElementById('registerBtn').addEventListener('click', function() {
        showToast('注册功能暂未开放', 'error');
    });
    
    // 探索课程按钮点击事件
    document.getElementById('exploreBtn').addEventListener('click', function() {
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        document.querySelector('[href="#courses"]').classList.add('active');
    });
    
    // 了解更多按钮点击事件
    document.getElementById('learnMoreBtn').addEventListener('click', function() {
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        document.querySelector('[href="#courses"]').classList.add('active');
    });
    
    // 登录表单提交事件
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    

    
    // 课程搜索功能
    document.getElementById('courseSearch').addEventListener('input', function() {
        filterCourses();
    });
    
    document.getElementById('searchBtn').addEventListener('click', function() {
        filterCourses();
    });
    
    // 课程筛选和排序功能
    document.getElementById('categoryFilter').addEventListener('change', function() {
        filterCourses();
    });
    
    document.getElementById('sortFilter').addEventListener('change', function() {
        filterCourses();
    });
    
    // 用户下拉菜单
    document.getElementById('dashboardLink').addEventListener('click', function(e) {
        e.preventDefault();
        openDashboard();
    });
    
    document.getElementById('logoutLink').addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
    
    // 模态框关闭事件
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // 点击模态框外部关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // 教师面板标签切换
    document.querySelectorAll('#teacherPanel .tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', function() {
            switchTab(this, '#teacherPanel');
        });
    });
    

    
    // 管理员面板标签切换
    document.querySelectorAll('#adminPanel .tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', function() {
            switchTab(this, '#adminPanel');
        });
    });
    
    // 添加课程按钮
    document.getElementById('addCourseBtn').addEventListener('click', function() {
        document.getElementById('courseFormTitle').textContent = '添加新课程';
        document.getElementById('courseForm').reset();
        document.getElementById('addCourseModal').style.display = 'block';
    });
    
    // 课程表单提交
    document.getElementById('courseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveCourse();
    });
    
    // 保存草稿按钮
    document.getElementById('saveDraftBtn').addEventListener('click', function() {
        saveCourse(true);
    });
    
    // 上传文件按钮
    document.getElementById('uploadDocBtn').addEventListener('click', function() {
        uploadFile('document');
    });
    
    document.getElementById('uploadVideoBtn').addEventListener('click', function() {
        uploadFile('video');
    });
    
    document.getElementById('uploadAudioBtn').addEventListener('click', function() {
        uploadFile('audio');
    });
    
    // 添加作业按钮
    document.getElementById('addAssignmentBtn')?.addEventListener('click', function() {
        document.getElementById('addAssignmentModal').style.display = 'block';
        populateCourseSelect('assignmentCourse');
    });
    
    // 作业表单提交
    document.getElementById('assignmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAssignment();
    });
    
    // 添加考试按钮
    document.getElementById('addExamBtn')?.addEventListener('click', function() {
        document.getElementById('addExamModal').style.display = 'block';
        populateCourseSelect('examCourse');
    });
    
    // 考试表单提交
    document.getElementById('examForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveExam();
    });
    
    // 保存成绩设置
    document.getElementById('saveGradeSettings').addEventListener('click', function() {
        const assignmentWeight = document.getElementById('assignmentWeight').value;
        const examWeight = document.getElementById('examWeight').value;
        
        if (parseInt(assignmentWeight) + parseInt(examWeight) !== 100) {
            showToast('权重总和必须为100%', 'error');
            return;
        }
        
        showToast('成绩构成设置已保存', 'success');
    });
    
    // 导入成绩按钮
    document.getElementById('importGradesBtn').addEventListener('click', function() {
        showToast('成绩导入功能暂未开放', 'info');
    });
    
    // 导出成绩按钮
    document.getElementById('exportGradesBtn').addEventListener('click', function() {
        showToast('成绩导出功能暂未开放', 'info');
    });
    
    // 添加用户按钮
    document.getElementById('addUserBtn').addEventListener('click', function() {
        showToast('添加用户功能暂未开放', 'info');
    });
    
    // 批量导入用户按钮
    document.getElementById('importUsersBtn').addEventListener('click', function() {
        showToast('批量导入用户功能暂未开放', 'info');
    });
    
    // 新学期设置按钮
    document.getElementById('newSemesterBtn').addEventListener('click', function() {
        showToast('新学期设置功能暂未开放', 'info');
    });
    
    // 筛选日志按钮
    document.getElementById('filterLogsBtn').addEventListener('click', function() {
        filterLogs();
    });
    
    // 系统设置表单提交
    document.getElementById('systemSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('系统设置已保存', 'success');
    });
}

// 加载课程列表
function loadCourses() {
    const courseList = document.getElementById('courseList');
    const noResults = document.getElementById('noResults');
    
    courseList.innerHTML = '';
    
    const filteredCourses = getFilteredCourses();
    
    // 重置默认的无结果消息
    noResults.innerHTML = `
        <h3>未找到匹配的课程</h3>
        <p>请尝试其他搜索关键词或筛选条件</p>
    `;
    
    if (filteredCourses.length === 0) {
        noResults.style.display = 'block';
        courseList.style.display = 'none';
        return;
    }
    
    noResults.style.display = 'none';
    courseList.style.display = 'grid';
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="https://picsum.photos/seed/course${course.id}/400/300.jpg" alt="${course.name}">
            </div>
            <div class="course-info">
                <h3 class="course-title">${course.name}</h3>
                <span class="course-category">${getCategoryName(course.category)}</span>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span>教师: ${course.teacherName}</span>
                    <span>学生: ${course.enrollmentCount}</span>
                    <span>评分: ${course.rating > 0 ? course.rating.toFixed(1) : '暂无评分'}</span>
                </div>
            </div>
        `;
        
        courseCard.addEventListener('click', function() {
            showCourseDetail(course.id);
        });
        
        courseList.appendChild(courseCard);
    });
}

// 获取筛选后的课程
function getFilteredCourses() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase().trim();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredCourses = courses;
    
    // 处理空格搜索
    if (searchTerm === ' ' || searchTerm === '') {
        // 空格搜索不做过滤，返回所有课程
        if (searchTerm === ' ') {
            showToast('您搜索了空格，已显示所有课程', 'info');
        }
    }
    // 处理其他搜索条件
    else if (searchTerm) {
        filteredCourses = filteredCourses.filter(course => 
            course.name.toLowerCase().includes(searchTerm) ||
            course.code.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.teacherName.toLowerCase().includes(searchTerm)
        );
        
        // 检查是否搜索结果为空
        if (filteredCourses.length === 0) {
            // 显示异常结果信息
            const noResults = document.getElementById('noResults');
            noResults.innerHTML = `
                <h3>未找到匹配的课程</h3>
                <p>未找到与 "${searchTerm}" 相关的课程</p>
                <p>请尝试其他搜索关键词或筛选条件</p>
                <button class="btn btn-outline" onclick="clearSearch()">清除搜索</button>
            `;
        }
    }
    
    // 分类筛选
    if (categoryFilter) {
        filteredCourses = filteredCourses.filter(course => course.category === categoryFilter);
    }
    
    // 排序
    switch (sortFilter) {
        case 'newest':
            filteredCourses.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
            break;
        case 'popular':
            filteredCourses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    return filteredCourses;
}

// 清除搜索
function clearSearch() {
    document.getElementById('courseSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    loadCourses();
}

// 筛选课程
function filterCourses() {
    loadCourses();
}

// 显示课程详情
function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const courseDetail = document.getElementById('courseDetail');
    courseDetail.innerHTML = `
        <div class="course-detail-header">
            <h2>${course.name}</h2>
            <div>
                ${currentUser && currentUser.type === 'teacher' ? 
                    `<button class="btn btn-outline" id="editCourseBtn">编辑课程</button>` : 
                    ''}
            </div>
        </div>
        <div class="course-detail-info">
            <p><strong>课程代码:</strong> ${course.code}</p>
            <p><strong>课程分类:</strong> ${getCategoryName(course.category)}</p>
            <p><strong>授课教师:</strong> ${course.teacherName}</p>
            <p><strong>课程简介:</strong> ${course.description}</p>
            <p><strong>学生人数:</strong> ${course.enrollmentCount}</p>
            <p><strong>课程评分:</strong> ${course.rating > 0 ? course.rating.toFixed(1) : '暂无评分'}</p>
            <p><strong>课程状态:</strong> ${course.status === 'published' ? '已发布' : '草稿'}</p>
        </div>
        <div class="course-tabs">
            <button class="course-tab active" data-tab="materials">课程资料</button>
            <button class="course-tab" data-tab="assignments">课程作业</button>
            <button class="course-tab" data-tab="exams">课程考试</button>
        </div>
        <div class="course-content">
            <div class="course-tab-content active" id="materials-tab">
                <h3>课程资料</h3>
                <div class="material-list">
                    ${course.materials.length > 0 ? 
                        course.materials.map(material => `
                            <div class="material-item" data-material-id="${material.id}">
                                <div class="material-icon">${getMaterialIcon(material.type)}</div>
                                <div class="material-name">${material.name}</div>
                                <div class="material-type">${getMaterialTypeName(material.type)}</div>
                            </div>
                        `).join('') : 
                        '<p>暂无课程资料</p>'}
                </div>
            </div>
            <div class="course-tab-content" id="assignments-tab">
                <h3>课程作业</h3>
                <div class="list-content">
                    ${getCourseAssignments(courseId).length > 0 ? 
                        getCourseAssignments(courseId).map(assignment => `
                            <div class="list-item">
                                <h4>${assignment.title}</h4>
                                <p>${assignment.description}</p>
                                <div class="meta">
                                    <span>截止时间: ${formatDate(assignment.deadline)}</span>
                                    <span>权重: ${assignment.weight}%</span>
                                </div>
                            </div>
                        `).join('') : 
                        '<p>暂无作业</p>'}
                </div>
            </div>
            <div class="course-tab-content" id="exams-tab">
                <h3>课程考试</h3>
                <div class="list-content">
                    ${getCourseExams(courseId).length > 0 ? 
                        getCourseExams(courseId).map(exam => `
                            <div class="list-item">
                                <h4>${exam.title}</h4>
                                <p>${exam.description}</p>
                                <div class="meta">
                                    <span>开始时间: ${formatDate(exam.startTime)}</span>
                                    <span>考试时长: ${exam.duration}分钟</span>
                                    <span>权重: ${exam.weight}%</span>
                                </div>
                            </div>
                        `).join('') : 
                        '<p>暂无考试</p>'}
                </div>
            </div>
        </div>
    `;
    
    // 绑定课程详情标签切换事件
    courseDetail.querySelectorAll('.course-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            courseDetail.querySelectorAll('.course-tab').forEach(t => t.classList.remove('active'));
            courseDetail.querySelectorAll('.course-tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
        });
    });
    

    
    // 绑定编辑课程事件
    const editCourseBtn = document.getElementById('editCourseBtn');
    if (editCourseBtn) {
        editCourseBtn.addEventListener('click', function() {
            editCourse(courseId);
        });
    }
    
    document.getElementById('courseModal').style.display = 'block';
}

// 处理登录
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const userType = document.getElementById('userType').value;
    const loginError = document.getElementById('loginError');
    
    if (!username || !password) {
        showLoginError('用户名和密码不能为空');
        return;
    }
    
    // 查找用户
    const user = users.find(u => 
        u.username === username && 
        u.type === userType
    );
    
    if (!user) {
        showLoginError('用户不存在或用户类型不匹配');
        return;
    }
    
    // 检查账户是否被锁定
    if (user.locked) {
        showLoginError('账户已被锁定，请稍后再试或联系管理员');
        return;
    }
    
    // 验证密码
    if (user.password !== password) {
        user.loginAttempts = (user.loginAttempts || 0) + 1;
        
        // 检查登录尝试次数
        if (user.loginAttempts >= 3) {
            user.locked = true;
            showLoginError('密码错误次数过多，账户已被锁定');
            addLog(user.id, user.name, '登录失败', '', 'login');
        } else {
            showLoginError(`密码错误，还有 ${3 - user.loginAttempts} 次尝试机会`);
            addLog(user.id, user.name, '登录失败', '', 'login');
        }
        return;
    }
    
    // 登录成功
    user.loginAttempts = 0;
    user.locked = false;
    currentUser = user;
    
    // 更新UI
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('userName').textContent = user.name;
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').style.display = 'none';
    
    showToast(`欢迎回来，${user.name}！`, 'success');
    
    // 记录日志
    addLog(user.id, user.name, '登录', '', 'login');
}

// 显示登录错误
function showLoginError(message) {
    const loginError = document.getElementById('loginError');
    loginError.textContent = message;
    loginError.style.display = 'block';
}

// 处理登出
function handleLogout() {
    if (currentUser) {
        addLog(currentUser.id, currentUser.name, '登出', '', 'login');
        currentUser = null;
    }
    
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('userInfo').style.display = 'none';
    showToast('已成功退出登录', 'success');
}

// 打开控制面板
function openDashboard() {
    if (!currentUser) return;
    
    switch (currentUser.type) {
        case 'teacher':
            openTeacherPanel();
            break;

        case 'admin':
            openAdminPanel();
            break;
    }
}

// 打开教师控制面板
function openTeacherPanel() {
    // 加载教师课程
    const teacherCourses = document.getElementById('teacherCourses');
    teacherCourses.innerHTML = '';
    
    const myCourses = courses.filter(course => course.teacherId === currentUser.id);
    
    if (myCourses.length === 0) {
        teacherCourses.innerHTML = '<p>您还没有创建任何课程</p>';
    } else {
        myCourses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <h4>${course.name} (${course.code})</h4>
                <p>${course.description}</p>
                <p>学生人数: ${course.students.length}</p>
                <div class="course-actions">
                    <button class="btn btn-outline" onclick="editCourse(${course.id})">编辑</button>
                    <button class="btn btn-outline" onclick="toggleCourseStatus(${course.id})">
                        ${course.status === 'published' ? '撤回' : '发布'}
                    </button>
                    <button class="btn btn-outline" onclick="viewCourseStudents(${course.id})">查看学生</button>
                </div>
            `;
            teacherCourses.appendChild(courseItem);
        });
    }
    
    // 加载作业列表
    const assignmentsList = document.getElementById('assignmentsList');
    assignmentsList.innerHTML = '';
    
    const myAssignments = assignments.filter(assignment => 
        courses.some(course => 
            course.id === assignment.courseId && course.teacherId === currentUser.id
        )
    );
    
    if (myAssignments.length === 0) {
        assignmentsList.innerHTML = '<p>您还没有创建任何作业</p>';
    } else {
        myAssignments.forEach(assignment => {
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'list-item';
            assignmentItem.innerHTML = `
                <h4>${assignment.title}</h4>
                <p>${assignment.description}</p>
                <p>所属课程: ${assignment.courseName}</p>
                <p>截止时间: ${formatDate(assignment.deadline)}</p>
                <p>权重: ${assignment.weight}%</p>
                <p>提交人数: ${assignment.submissions.length}</p>
                <div class="list-actions">
                    <button class="btn btn-outline" onclick="viewSubmissions(${assignment.id})">查看提交</button>
                    <button class="btn btn-outline" onclick="editAssignment(${assignment.id})">编辑</button>
                </div>
            `;
            assignmentsList.appendChild(assignmentItem);
        });
        
        // 添加创建作业按钮
        const addAssignmentBtn = document.createElement('button');
        addAssignmentBtn.id = 'addAssignmentBtn';
        addAssignmentBtn.className = 'btn btn-primary';
        addAssignmentBtn.textContent = '添加新作业';
        addAssignmentBtn.addEventListener('click', function() {
            document.getElementById('addAssignmentModal').style.display = 'block';
            populateCourseSelect('assignmentCourse');
        });
        assignmentsList.appendChild(addAssignmentBtn);
    }
    
    // 加载考试列表
    const examsList = document.getElementById('examsList');
    examsList.innerHTML = '';
    
    const myExams = exams.filter(exam => 
        courses.some(course => 
            course.id === exam.courseId && course.teacherId === currentUser.id
        )
    );
    
    if (myExams.length === 0) {
        examsList.innerHTML = '<p>您还没有创建任何考试</p>';
    } else {
        myExams.forEach(exam => {
            const examItem = document.createElement('div');
            examItem.className = 'list-item';
            examItem.innerHTML = `
                <h4>${exam.title}</h4>
                <p>${exam.description}</p>
                <p>所属课程: ${exam.courseName}</p>
                <p>开始时间: ${formatDate(exam.startTime)}</p>
                <p>考试时长: ${exam.duration}分钟</p>
                <p>权重: ${exam.weight}%</p>
                <p>参加人数: ${exam.results.length}</p>
                <div class="list-actions">
                    <button class="btn btn-outline" onclick="viewExamResults(${exam.id})">查看成绩</button>
                    <button class="btn btn-outline" onclick="editExam(${exam.id})">编辑</button>
                </div>
            `;
            examsList.appendChild(examItem);
        });
        
        // 添加创建考试按钮
        const addExamBtn = document.createElement('button');
        addExamBtn.id = 'addExamBtn';
        addExamBtn.className = 'btn btn-primary';
        addExamBtn.textContent = '添加新考试';
        addExamBtn.addEventListener('click', function() {
            document.getElementById('addExamModal').style.display = 'block';
            populateCourseSelect('examCourse');
        });
        examsList.appendChild(addExamBtn);
    }
    
    // 加载成绩表格
    loadGradesTable();
    
    document.getElementById('teacherPanel').style.display = 'block';
}



// 打开管理员控制面板
function openAdminPanel() {
    // 加载用户表格
    loadUsersTable();
    
    // 加载课程管理
    const adminCourses = document.getElementById('adminCourses');
    adminCourses.innerHTML = '';
    
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'list-item';
        courseItem.innerHTML = `
            <h4>${course.name} (${course.code})</h4>
            <p>授课教师: ${course.teacherName}</p>
            <p>学生人数: ${course.students.length}</p>
            <p>课程状态: ${course.status === 'published' ? '已发布' : '草稿'}</p>
            <div class="list-actions">
                <button class="btn btn-outline" onclick="viewCourseDetail(${course.id})">查看详情</button>
                <button class="btn btn-outline" onclick="manageCourse(${course.id})">管理课程</button>
            </div>
        `;
        adminCourses.appendChild(courseItem);
    });
    
    // 加载成绩审核
    loadGradeReviewTable();
    
    // 加载操作日志
    loadLogsTable();
    
    document.getElementById('adminPanel').style.display = 'block';
}

// 加载用户表格
function loadUsersTable() {
    const usersTable = document.getElementById('usersTable');
    usersTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>姓名</th>
                    <th>类型</th>
                    <th>邮箱</th>
                    <th>状态</th>
                    <th>登录尝试次数</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${getUserTypeName(user.type)}</td>
                        <td>${user.email}</td>
                        <td>${user.locked ? '已锁定' : '正常'}</td>
                        <td>${user.loginAttempts || 0}</td>
                        <td>
                            ${user.locked ? 
                                `<button class="btn btn-outline" onclick="unlockUser(${user.id})">解锁</button>` : 
                                ''}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// 加载成绩审核表格
function loadGradeReviewTable() {
    const gradeReview = document.getElementById('gradeReview');
    if (grades.length === 0) {
        gradeReview.innerHTML = '<p>暂无成绩记录</p>';
        return;
    }
    
    gradeReview.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>学生姓名</th>
                    <th>课程名称</th>
                    <th>作业得分</th>
                    <th>考试得分</th>
                    <th>最终成绩</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                ${grades.map(grade => {
                    const assignmentTotal = Object.values(grade.assignmentScores).reduce((sum, score) => sum + (score || 0), 0);
                    const examTotal = Object.values(grade.examScores).reduce((sum, score) => sum + (score || 0), 0);
                    
                    return `
                        <tr>
                            <td>${grade.studentName}</td>
                            <td>${grade.courseName}</td>
                            <td>${assignmentTotal || '-'}</td>
                            <td>${examTotal || '-'}</td>
                            <td>${grade.finalScore || '未计算'}</td>
                            <td>${grade.status === 'pending' ? '待审核' : '已发布'}</td>
                            <td>
                                ${grade.status === 'pending' ? 
                                    `<button class="btn btn-primary" onclick="approveGrade(${grade.studentId}, ${grade.courseId})">审核通过</button>` : 
                                    '已审核'}
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// 加载操作日志
function loadLogsTable() {
    const logsTable = document.getElementById('logsTable');
    
    // 获取筛选条件
    const logTypeFilter = document.getElementById('logTypeFilter').value;
    const logDateFilter = document.getElementById('logDateFilter').value;
    
    // 筛选日志
    let filteredLogs = logs;
    
    if (logTypeFilter) {
        filteredLogs = filteredLogs.filter(log => log.type === logTypeFilter);
    }
    
    if (logDateFilter) {
        filteredLogs = filteredLogs.filter(log => 
            log.timestamp.startsWith(logDateFilter)
        );
    }
    
    logsTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>时间</th>
                    <th>用户</th>
                    <th>操作</th>
                    <th>目标</th>
                    <th>类型</th>
                </tr>
            </thead>
            <tbody>
                ${filteredLogs.map(log => `
                    <tr>
                        <td>${formatDateTime(log.timestamp)}</td>
                        <td>${log.userName}</td>
                        <td>${log.action}</td>
                        <td>${log.target || '-'}</td>
                        <td>${getLogTypeName(log.type)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// 筛选日志
function filterLogs() {
    loadLogsTable();
}

// 加载成绩表格
function loadGradesTable() {
    const gradesTable = document.getElementById('gradesTable');
    gradesTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>学生姓名</th>
                    <th>课程名称</th>
                    <th>作业得分</th>
                    <th>考试得分</th>
                    <th>最终成绩</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                ${grades.map(grade => {
                    const assignmentTotal = Object.values(grade.assignmentScores).reduce((sum, score) => sum + (score || 0), 0);
                    const examTotal = Object.values(grade.examScores).reduce((sum, score) => sum + (score || 0), 0);
                    
                    return `
                        <tr>
                            <td>${grade.studentName}</td>
                            <td>${grade.courseName}</td>
                            <td>${assignmentTotal || '-'}</td>
                            <td>${examTotal || '-'}</td>
                            <td>
                                ${grade.finalScore ? grade.finalScore : 
                                    `<input type="number" id="grade-${grade.studentId}-${grade.courseId}" placeholder="输入成绩">`}
                            </td>
                            <td>
                                ${!grade.finalScore ? 
                                    `<button class="btn btn-primary" onclick="saveGrade(${grade.studentId}, ${grade.courseId})">保存</button>` : 
                                    '已录入'}
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// 切换标签
function switchTab(tabBtn, panelSelector) {
    const panel = document.querySelector(panelSelector);
    const tabName = tabBtn.dataset.tab;
    
    // 切换按钮状态
    panel.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    tabBtn.classList.add('active');
    
    // 切换内容显示
    panel.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    panel.querySelector(`#${tabName}Tab`).classList.add('active');
}

// 保存课程
function saveCourse(isDraft = false) {
    const courseName = document.getElementById('courseName').value.trim();
    const courseCode = document.getElementById('courseCode').value.trim();
    const courseCategory = document.getElementById('courseCategory').value;
    const courseDescription = document.getElementById('courseDescription').value.trim();
    
    if (!courseName || !courseCode) {
        showToast('课程名称和课程代码不能为空', 'error');
        return;
    }
    
    // 检查课程代码是否已存在
    const existingCourse = courses.find(c => c.code === courseCode);
    if (existingCourse) {
        showToast('课程代码已存在', 'error');
        return;
    }
    
    // 创建新课程
    const newCourse = {
        id: courses.length + 1,
        name: courseName,
        code: courseCode,
        category: courseCategory,
        description: courseDescription,
        teacherId: currentUser.id,
        teacherName: currentUser.name,
        status: isDraft ? 'draft' : 'published',
        materials: [],
        students: [],
        rating: 0,
        enrollmentCount: 0,
        createTime: new Date().toISOString().split('T')[0]
    };
    
    courses.push(newCourse);
    
    // 记录日志
    addLog(currentUser.id, currentUser.name, '创建课程', courseName, 'course');
    
    // 显示成功消息
    const action = isDraft ? '保存为草稿' : '发布';
    showToast(`课程已${action}`, 'success');
    
    // 关闭模态框
    document.getElementById('addCourseModal').style.display = 'none';
    
    // 刷新课程列表
    loadCourses();
}

// 编辑课程
function editCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // 关闭课程详情模态框
    document.getElementById('courseModal').style.display = 'none';
    
    // 打开添加课程模态框并填充数据
    document.getElementById('courseFormTitle').textContent = '编辑课程';
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseCode').value = course.code;
    document.getElementById('courseCategory').value = course.category;
    document.getElementById('courseDescription').value = course.description;
    document.getElementById('courseStatus').value = course.status;
    
    // 显示已上传文件
    const uploadedFiles = document.getElementById('uploadedFiles');
    uploadedFiles.innerHTML = '';
    course.materials.forEach(material => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${material.name}</span>
            <button onclick="removeFile(${material.id})">删除</button>
        `;
        uploadedFiles.appendChild(fileItem);
    });
    
    document.getElementById('addCourseModal').style.display = 'block';
    
    // 更改表单提交行为为更新而非创建
    const form = document.getElementById('courseForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        course.name = document.getElementById('courseName').value.trim();
        course.code = document.getElementById('courseCode').value.trim();
        course.category = document.getElementById('courseCategory').value;
        course.description = document.getElementById('courseDescription').value.trim();
        course.status = document.getElementById('courseStatus').value;
        
        // 记录日志
        addLog(currentUser.id, currentUser.name, '编辑课程', course.name, 'course');
        
        showToast('课程已更新', 'success');
        document.getElementById('addCourseModal').style.display = 'none';
        
        // 恢复原始表单提交行为
        form.onsubmit = function(e) {
            e.preventDefault();
            saveCourse();
        };
        
        // 刷新课程列表
        loadCourses();
    };
}

// 切换课程状态
function toggleCourseStatus(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    course.status = course.status === 'published' ? 'draft' : 'published';
    
    const action = course.status === 'published' ? '发布' : '撤回';
    showToast(`课程已${action}`, 'success');
    
    // 记录日志
    addLog(currentUser.id, currentUser.name, action, course.name, 'course');
    
    // 刷新教师面板
    if (currentUser && currentUser.type === 'teacher') {
        openTeacherPanel();
    }
}

// 上传文件
function uploadFile(fileType) {
    const input = document.createElement('input');
    input.type = 'file';
    
    if (fileType === 'document') {
        input.accept = '.pdf,.doc,.docx,.txt';
    } else if (fileType === 'video') {
        input.accept = '.mp4,.avi,.mov';
    } else if (fileType === 'audio') {
        input.accept = '.mp3,.wav,.flac';
    }
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const uploadedFiles = document.getElementById('uploadedFiles');
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileId = Date.now();
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="removeFile(${fileId})">删除</button>
        `;
        
        uploadedFiles.appendChild(fileItem);
        
        showToast('文件上传成功', 'success');
    };
    
    input.click();
}

// 删除文件
function removeFile(fileId) {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        if (item.innerHTML.includes(`removeFile(${fileId})`)) {
            item.remove();
            showToast('文件已删除', 'success');
        }
    });
}



// 保存作业
function saveAssignment() {
    const title = document.getElementById('assignmentTitle').value.trim();
    const courseId = parseInt(document.getElementById('assignmentCourse').value);
    const description = document.getElementById('assignmentDescription').value.trim();
    const deadline = document.getElementById('assignmentDeadline').value;
    const weight = parseInt(document.getElementById('assignmentWeight').value);
    
    if (!title || !courseId || !deadline) {
        showToast('请填写必要信息', 'error');
        return;
    }
    
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        showToast('课程不存在', 'error');
        return;
    }
    
    const newAssignment = {
        id: assignments.length + 1,
        title: title,
        description: description,
        courseId: courseId,
        courseName: course.name,
        deadline: deadline,
        weight: weight,
        submissions: []
    };
    
    assignments.push(newAssignment);
    
    showToast('作业已创建', 'success');
    
    // 记录日志
    addLog(currentUser.id, currentUser.name, '创建作业', title, 'course');
    
    document.getElementById('addAssignmentModal').style.display = 'none';
    document.getElementById('assignmentForm').reset();
}

// 保存考试
function saveExam() {
    const title = document.getElementById('examTitle').value.trim();
    const courseId = parseInt(document.getElementById('examCourse').value);
    const description = document.getElementById('examDescription').value.trim();
    const startTime = document.getElementById('examStartTime').value;
    const duration = parseInt(document.getElementById('examDuration').value);
    const weight = parseInt(document.getElementById('examWeight').value);
    
    if (!title || !courseId || !startTime || !duration) {
        showToast('请填写必要信息', 'error');
        return;
    }
    
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        showToast('课程不存在', 'error');
        return;
    }
    
    const newExam = {
        id: exams.length + 1,
        title: title,
        description: description,
        courseId: courseId,
        courseName: course.name,
        startTime: startTime,
        duration: duration,
        weight: weight,
        results: []
    };
    
    exams.push(newExam);
    
    showToast('考试已创建', 'success');
    
    // 记录日志
    addLog(currentUser.id, currentUser.name, '创建考试', title, 'course');
    
    document.getElementById('addExamModal').style.display = 'none';
    document.getElementById('examForm').reset();
}



// 保存成绩
function saveGrade(studentId, courseId) {
    const gradeInput = document.getElementById(`grade-${studentId}-${courseId}`);
    const score = parseFloat(gradeInput.value);
    
    if (isNaN(score) || score < 0 || score > 100) {
        showToast('请输入0-100之间的有效成绩', 'error');
        return;
    }
    
    const grade = grades.find(g => g.studentId === studentId && g.courseId === courseId);
    if (!grade) return;
    
    grade.finalScore = score;
    grade.status = 'published';
    
    showToast('成绩已保存', 'success');
    
    // 记录日志
    const student = users.find(u => u.id === studentId);
    addLog(currentUser.id, currentUser.name, '录入成绩', `${student.name} - ${grade.courseName}`, 'grade');
    
    // 刷新成绩表格
    loadGradesTable();
}

// 审核成绩
function approveGrade(studentId, courseId) {
    const grade = grades.find(g => g.studentId === studentId && g.courseId === courseId);
    if (!grade) return;
    
    grade.status = 'published';
    
    showToast('成绩已审核通过', 'success');
    
    // 记录日志
    const student = users.find(u => u.id === studentId);
    addLog(currentUser.id, currentUser.name, '审核成绩', `${student.name} - ${grade.courseName}`, 'grade');
    
    // 刷新成绩审核表格
    if (currentUser && currentUser.type === 'admin') {
        openAdminPanel();
    }
}

// 解锁用户
function unlockUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    user.locked = false;
    user.loginAttempts = 0;
    
    showToast(`用户 ${user.name} 已解锁`, 'success');
    
    // 记录日志
    addLog(currentUser.id, currentUser.name, '解锁用户', user.name, 'system');
    
    // 刷新用户表格
    if (currentUser && currentUser.type === 'admin') {
        openAdminPanel();
    }
}

// 添加操作日志
function addLog(userId, userName, action, target, type) {
    const log = {
        id: logs.length + 1,
        userId: userId,
        userName: userName,
        action: action,
        target: target,
        timestamp: new Date().toISOString(),
        type: type
    };
    
    logs.push(log);
    
    // 限制日志数量，保留最近1000条
    if (logs.length > 1000) {
        logs = logs.slice(-1000);
    }
}

// 填充课程选择下拉框
function populateCourseSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    
    if (currentUser && currentUser.type === 'teacher') {
        const teacherCourses = courses.filter(course => course.teacherId === currentUser.id);
        
        teacherCourses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = `${course.name} (${course.code})`;
            select.appendChild(option);
        });
    }
}

// 获取课程作业
function getCourseAssignments(courseId) {
    return assignments.filter(assignment => assignment.courseId === courseId);
}

// 获取课程考试
function getCourseExams(courseId) {
    return exams.filter(exam => exam.courseId === courseId);
}



// 计算GPA
function calculateGPA(score) {
    if (typeof score !== 'number') return 'N/A';
    
    if (score >= 90) return '4.0';
    if (score >= 85) return '3.7';
    if (score >= 82) return '3.3';
    if (score >= 78) return '3.0';
    if (score >= 75) return '2.7';
    if (score >= 72) return '2.3';
    if (score >= 68) return '2.0';
    if (score >= 64) return '1.5';
    if (score >= 60) return '1.0';
    return '0.0';
}

// 获取分类名称
function getCategoryName(category) {
    switch (category) {
        case 'computer': return '计算机科学';
        case 'math': return '数学';
        case 'english': return '英语';
        case 'physics': return '物理';
        default: return '其他';
    }
}

// 获取用户类型名称
function getUserTypeName(type) {
    switch (type) {
        case 'admin': return '管理员';
        case 'teacher': return '教师';
        case 'student': return '学生';
        default: return '未知';
    }
}

// 获取日志类型名称
function getLogTypeName(type) {
    switch (type) {
        case 'login': return '登录';
        case 'course': return '课程';
        case 'grade': return '成绩';
        case 'system': return '系统';
        default: return '其他';
    }
}

// 获取材料图标
function getMaterialIcon(type) {
    switch (type) {
        case 'document': return '📄';
        case 'video': return '🎥';
        case 'audio': return '🎵';
        default: return '📎';
    }
}

// 获取材料类型名称
function getMaterialTypeName(type) {
    switch (type) {
        case 'document': return '文档';
        case 'video': return '视频';
        case 'audio': return '音频';
        default: return '其他';
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
}

// 格式化日期时间
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
}

// 显示提示消息
function showToast(message, type = 'info') {
    let toast;
    
    if (type === 'success') {
        toast = document.getElementById('successToast');
        document.getElementById('successMessage').textContent = message;
    } else if (type === 'error') {
        toast = document.getElementById('errorToast');
        document.getElementById('errorMessage').textContent = message;
    } else {
        // 创建一个信息提示框
        toast = document.createElement('div');
        toast.className = 'toast toast-info';
        toast.style.backgroundColor = '#17a2b8';
        toast.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(toast);
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        if (type === 'info' && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}