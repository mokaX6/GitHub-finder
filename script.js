// === DOM Elements === //
const input = document.getElementById("input");
const sBtn = document.getElementById("sBtn");

const profileContainer = document.getElementById("profile-container");
const userAvatar = document.getElementById("avatar");
const userName = document.getElementById("name");
const userHandle = document.getElementById("username");
const bio = document.getElementById("bio");
const followersCount = document.getElementById("followers-count");
const followingCount = document.getElementById("following-count");
const userLocation = document.getElementById("location");
const blog = document.getElementById("blog");
const blogBox = document.getElementById("blog-box");
const userJoined = document.getElementById("joined-date");
const reposContainer = document.getElementById("repos-container");
const reposCount = document.getElementById("repos-count");
const errorContainer = document.getElementById("error-container");

// دالة لتنسيق تاريخ الإنشاء لشكل احترافي مثل GitHub
function formatDate(dateString) {
  if (!dateString) return "Joined Recently";
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return `Joined ${new Date(dateString).toLocaleDateString('en-US', options)}`;
}

async function fetchGitHubUser() {
  const username = input.value.trim();
  if (!username) return;

  errorContainer.classList.add("hidden");
  profileContainer.classList.add("hidden");

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
    ]);

    if (!userRes.ok) throw new Error("User not found");

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    // تحديث بيانات المستخدم الأساسية
    profileContainer.classList.remove("hidden");
    userAvatar.src = userData.avatar_url;
    userName.textContent = userData.name || userData.login;
    userHandle.textContent = `@${userData.login}`;
    bio.textContent = userData.bio || "No bio available";
    reposCount.textContent = userData.public_repos;
    followersCount.textContent = userData.followers;
    followingCount.textContent = userData.following;
    
    // الموقع الجغرافي
    userLocation.textContent = userData.location || "Not Available";
    
    // تاريخ التسجيل في جيت هاب
    userJoined.textContent = formatDate(userData.created_at);

    // رابط الموقع الشخصي (الـ Blog) مع إخفائه إن لم يكن متوفراً
    if (userData.blog) {
      blog.href = userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`;
      blog.textContent = userData.blog;
      blogBox.style.display = "flex";
    } else {
      blogBox.style.display = "none";
    }

    reposContainer.innerHTML = "";
    if (reposData.length === 0) {
      reposContainer.innerHTML = "<p style='color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 10px;'>No repositories found.</p>";
    } else {
      reposData.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.className = "repo-card";
        const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        
        repoCard.innerHTML = `
          <div class="repo-header-row">
            <a href="${repo.html_url}" target="_blank" class="repo-title-link">📁 ${repo.name}</a>
          </div>
          <p class="repo-desc">${repo.description || "No description available"}</p>
          <div class="repo-footer-row">
            <span class="repo-lang-badge">
              <span style="width: 8px; height: 8px; background-color: ${repo.language ? '#8b5cf6' : '#94a3b8'}; border-radius: 50%; display: inline-block;"></span>
              ${repo.language || "Code"}
            </span>
            <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
            <span class="repo-stat">🔀 ${repo.forks_count}</span>
            <span class="repo-date">Updated ${updatedDate}</span>
          </div>
        `;
        reposContainer.appendChild(repoCard);
      });
    }

  } catch (error) {
    errorContainer.classList.remove("hidden");
  }
}

sBtn.addEventListener("click", fetchGitHubUser);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchGitHubUser();
  }
});
