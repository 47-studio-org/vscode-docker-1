/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Volume } from "dockerode";
import { IActionContext, openReadOnlyJson } from "vscode-azureextensionui";
import { ext } from "../../extensionVariables";
import { VolumeTreeItem } from "../../tree/volumes/VolumeTreeItem";
import { callDockerodeWithErrorHandling } from "../../utils/callDockerodeWithErrorHandling";

export async function inspectVolume(context: IActionContext, node?: VolumeTreeItem): Promise<void> {
    if (!node) {
        node = await ext.volumesTree.showTreeItemPicker<VolumeTreeItem>(VolumeTreeItem.contextValue, { ...context, noItemFoundErrorMessage: 'No volumes are available to inspect' });
    }

    const volume: Volume = node.getVolume();
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const inspectInfo = await callDockerodeWithErrorHandling(() => volume.inspect(), context);
    await openReadOnlyJson(node, inspectInfo);
}
