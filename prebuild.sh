#/bin/bash

echo "Skip type checking in 'src/libs/polkadot/__generated__/**/*.ts'."
for file in $(find  src/libs/polkadot/__generated__ -name \*.ts); do
  sed -i '1s/^/\/\/ @ts-nocheck\n/' "${file}"
done
