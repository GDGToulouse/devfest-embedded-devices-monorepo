#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

pids=""
rc=0

trap 'sigintTrap' 2

sigintTrap() {
	echo "pids=${pids}"
	if [ "${pids}X" != "X" ]; then
		kill -9 ${pids}
	fi
	exit 2
}

ssoNetworkName="sso-net"

ssoDatabaseContainerName="postgres"
ssoDatabaseContainerPassword="sso-db"
ssoDatabaseContainerPort="5432"
ssoDatabaseContainerUser="sso-db"
ssoDatabaseContainerDatabase="keycloak"

ssoContainerName="sso"
ssoContainerPassword="sso"
ssoContainerPort="5004"
ssoContainerUser="sso"


docker \
	network \
		remove \
			${ssoNetworkName}

docker \
	stop \
		${ssoDatabaseContainerName} ${ssoContainerName}

docker \
	rm \
		${ssoDatabaseContainerName} ${ssoContainerName}


docker \
	network \
		create \
			--driver bridge \
				${ssoNetworkName}
docker \
	run \
		--rm \
		-p ${ssoDatabaseContainerPort}:5432 \
		--name ${ssoDatabaseContainerName} \
		--network ${ssoNetworkName} \
		-e POSTGRES_DB=${ssoDatabaseContainerDatabase} \
		-e POSTGRES_USER=${ssoDatabaseContainerUser} \
		-e POSTGRES_PASSWORD=${ssoDatabaseContainerPassword} \
		postgres:latest \
&
pids="${pids} $!"

docker \
	run \
		--rm \
		-p ${ssoContainerPort}:8080 \
		--network ${ssoNetworkName} \
		--name ${ssoContainerName} \
		-e DB_VENDOR=POSTGRES \
		-e DB_ADDR=${ssoDatabaseContainerName} \
		-e DB_PORT=${ssoDatabaseContainerPort} \
		-e DB_DATABASE=${ssoDatabaseContainerDatabase} \
		-e DB_USER=${ssoDatabaseContainerUser} \
		-e DB_PASSWORD=${ssoDatabaseContainerPassword} \
		-e KEYCLOAK_USER=${ssoContainerUser} \
		-e KEYCLOAK_PASSWORD=${ssoContainerPassword} \
		quay.io/keycloak/keycloak:latest \
			-b 0.0.0.0 \
&
pids="${pids} $!"

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:${ssoContainerPort}/auth/admin)" != "302" ]]; do echo "waiting sso to be up" && sleep 5; done

echo "The SSO admin console will be available here: http://localhost:${ssoContainerPort}/auth/admin"

authenticationResponse=`curl --data "username=${ssoContainerUser}&password=${ssoContainerPassword}&grant_type=password&client_id=admin-cli" http://localhost:${ssoContainerPort}/auth/realms/master/protocol/openid-connect/token`
token=`echo ${authenticationResponse} | sed 's/.*access_token":"//g' | sed 's/".*//g'`

IFS_BACKUP=${IFS}
{
	IFS=,
	read
	while read -r realmRealm realmEnabled
	do
		realmPosted="{\"realm\":\"${realmRealm}\",\"enabled\":${realmEnabled}}"
		echo "realmPosted=${realmPosted}"

		curl \
			--verbose \
			--header 'Content-Type: application/json' \
			--header "Authorization: bearer ${token}" \
			-X POST \
			http://localhost:${ssoContainerPort}/auth/admin/realms \
			--data "${realmPosted}"

		{
			read
			while read -r realmUserUsername realmUserEnabled
			do
				realmUserPosted="{\"username\":\"${realmUserUsername}\",\"enabled\":${realmUserEnabled}}"
				echo "realmUserPosted=${realmUserPosted}"

				realmUserCreationResponse=`curl \
					-i \
					--verbose \
					--header 'Content-Type: application/json' \
					--header "Authorization: bearer ${token}" \
					-X POST \
					http://localhost:${ssoContainerPort}/auth/admin/realms/${realmRealm}/users \
					--data "${realmUserPosted}"
				`
				realmUserId=`echo "${realmUserCreationResponse}" | grep "Location: " | rev | cut -d'/' -f1 | rev | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ /g' | sed 's/.$//'`

				{
					read
					while read -r realmUserResetPasswordType realmUserResetPasswordTemporary realmUserResetPasswordValue
					do
						realmUserResetPassword="{\"type\":\"${realmUserResetPasswordType}\",\"temporary\":${realmUserResetPasswordTemporary},\"value\":\"${realmUserResetPasswordValue}\"}"
						echo "realmUserResetPassword=${realmUserResetPassword}"

						curl \
							--verbose \
							--header 'Content-Type: application/json' \
							--header "Authorization: bearer ${token}" \
							-X PUT \
							http://localhost:${ssoContainerPort}/auth/admin/realms/${realmRealm}/users/${realmUserId}/reset-password \
							--data "${realmUserResetPassword}"

					done
				} < ${hereDir}/data/realms/${realmRealm}/users/${realmUserUsername}/reset-password/index.env
			done
		} < ${hereDir}/data/realms/${realmRealm}/users/index.env

		{
			read
			while read -r realmClientClientId realmClientRootUrl realmClientRedirectUris
			do
				realmClientPosted="{\"clientId\":\"${realmClientClientId}\",\"rootUrl\":\"${realmClientRootUrl}\",\"redirectUris\":${realmClientRedirectUris}}"
				echo "realmClientPosted=${realmClientPosted}"

				curl \
					-i \
					--verbose \
					--header 'Content-Type: application/json' \
					--header "Authorization: bearer ${token}" \
					-X POST \
					http://localhost:${ssoContainerPort}/auth/admin/realms/${realmRealm}/clients \
					--data "${realmClientPosted}"
			done
		} < ${hereDir}/data/realms/${realmRealm}/clients/index.env
	done
} < ${hereDir}/data/realms/index.env
IFS=${IFS_BACKUP}

for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
