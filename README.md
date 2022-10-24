# deploy-impact-22-wikimini-b
Repository for Team wikimini-b for deploy(impact) 2022

# Git Workflow

- The main branch contains production-ready, to-be-deployed code, the development branch contains all the latest developed features and will be used for testing, to then be merged into main.

- Features will be developed in dedicated branches named as follows:

    "i" + number of the relative issue + "-description-of-feature"

    For example, if I want to work on issue https://github.com/WomenPlusPlus/deploy-impact-22-wikimini-b/issues/14 and need to create a branch, I will create branch "i14-initialize-backend-structure" (GitHub can create a branch with that name from an issue automatically)

- All newly created feature branches should originate from main or development, and at the end of implementing the feature, a pull request for the development branch is to be created and reviewed, and then merged into the development branch.

- It is important to periodically rebase development into one's feature branch (for example, right before beginning to work at the start of the day) to make sure to have the latest features and avoid conflicts.

- Feature branches should never be merged into each other.

- Barring exceptional cases, no commits shall be made to development or main, only merges.
