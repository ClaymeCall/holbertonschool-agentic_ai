## Which line was conflicting?
The conflict was happening on the line defining the version.

## Why this one and not the other ones?
The reason this line was conflicting is that it was modified on two branches at the same time.
The other lines were not conflicting because they were each modified in their own branch, so Git was able to simply merge the latest version of both.

## How did I fix it?
To resolve the conflict, I deleted the git conflict tags and the version of the line I didn't want to keep.
I then staged the changes and was able to commit.
