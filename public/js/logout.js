const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert("Unable to logout. Please try again.");
    }
};
document.querySelector('#logout').addEventListener('click', logout);