/**
 * Copyright 2021 Opstrace, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { useParams } from "react-router-dom";

import useFetcher from "client/hooks/useFetcher";

import { CredentialsTable } from "./Table";
import { CredentialsForm } from "./Form";

import { Box } from "client/components/Box";

function Credentials() {
  const { tenantId } = useParams<{ tenantId: string }>();

  const { data } = useFetcher(
    `query credentials($tenant_id: String) {
       credential(where: { tenant: { _eq: $tenant_id } }) {
         type
         name
         created_at
       }
     }`,
    { tenant_id: tenantId }
  );

  return (
    <Box display="flex" height="500px" width="700px">
      <CredentialsTable rows={data?.credential} />
      <CredentialsForm tenantId={tenantId} />
    </Box>
  );
}

const CredentialsTab = {
  key: "credentials",
  label: "Credentials",
  content: Credentials
};

export { Credentials, CredentialsTab };
