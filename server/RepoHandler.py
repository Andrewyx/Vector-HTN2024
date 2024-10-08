from Constants import DATA_FOLDER_PATH 
from git import Repo # type: ignore
import os

def get_repo(repo_url) -> None:
    repo = Repo.clone_from(repo_url, DATA_FOLDER_PATH)

    # get rid of the .git folder
    os.system(f"rm -rf {DATA_FOLDER_PATH}/.git")


def parse_downloaded_repo() -> None:
    # some kind of loop for is_valid_code_file()
    pass

def is_valid_code_file(fileHeader: str) -> bool:
    return True

def rename_to_txt(filename) -> str:
    return filename.split('.')[-1] + '.txt'


# Debug
if __name__ == '__main__':
    get_repo("https://github.com/Andrewyx/Vector-HTN2024.git")