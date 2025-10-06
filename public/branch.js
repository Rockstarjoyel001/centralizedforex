 const branchSpan = document.getElementById("branch-name");
  const STORAGE_KEY = "branchName";
  function loadBranch() {
    const savedBranch = localStorage.getItem(STORAGE_KEY);
    console.log("Loading branch from storage:", savedBranch);
    if (savedBranch !== null && savedBranch.trim() !== "") {
      branchSpan.textContent = savedBranch;
    } else {
      branchSpan.textContent = "Default"; 
    }
  }
  function saveBranch() {
    const value = branchSpan.textContent.trim();
    localStorage.setItem(STORAGE_KEY, value);
    console.log("Saving branch:", value);
  }
  branchSpan.addEventListener("input", () => {
    console.log("INPUT event fired");
    saveBranch();
  });
  branchSpan.addEventListener("blur", () => {
    console.log("BLUR event fired");
    saveBranch();
  });
  loadBranch();
   const branch = localStorage.getItem('branchName') || 'Default Branch'; 
   document.getElementById('branch-name').textContent = branch;